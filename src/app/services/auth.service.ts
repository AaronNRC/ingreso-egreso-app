import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth, 
    private firestore: AngularFirestore
  ) { }

  initAuthListener(): void {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser?.uid);
      console.log(fuser?.email);
      
    })
  }

  crearUsuario( nombre: string, email: string, password: string): any {
    console.log({nombre, email, password});
    return this.auth.createUserWithEmailAndPassword(email, password);
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
