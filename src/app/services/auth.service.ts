import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { setUser, unSetUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(
    public auth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private store: Store
  ) { }

  initAuthListener(): void {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
       this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
       .subscribe( (firestoreUser: any) => {
        const user = Usuario.fromFireBase(firestoreUser);
        this.store.dispatch(setUser({ user: user }));
        console.log(firestoreUser);
       })
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(unSetUser())
      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string): any {
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then( fbUser => {
      const newUser = new Usuario( fbUser.user.uid, nombre, email );
      this.firestore.doc(`${fbUser.user.uid}/usuario`).set(
        {...newUser}
      )
    })
  }

  loginUsuario( email: string, password: string): any {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): any{
    return this.auth.signOut();
  }

  isAuth(): any {
    return this.auth.authState.pipe(
      map(fbuser => fbuser != null)
    );
  }
}
