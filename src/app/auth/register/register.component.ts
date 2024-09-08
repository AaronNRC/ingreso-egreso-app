import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['' , Validators.required],
      correo: ['' , [Validators.required, Validators.email]],
      password: ['' , Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
      console.log('Cargando Subs');
    })
  }

  public ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  public createUser(): void {
    if (this.form.invalid){
      return ;
    }
    this.store.dispatch(isLoading());
    const {nombre, correo, password} = this.form.value;
    this.authService.crearUsuario(nombre, correo, password).then(
      credenciales => {
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      }
    ).catch(() => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registro incorrecto, la clave debe tener min 6 digitos",
      });
    })
  }


}
