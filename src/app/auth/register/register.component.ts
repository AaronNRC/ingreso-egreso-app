import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['' , Validators.required],
      correo: ['' , [Validators.required, Validators.email]],
      password: ['' , Validators.required],
      
    })
  }

  public createUser(): void {
    if (this.form.invalid){
      return ;
    }
    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const {nombre, correo, password} = this.form.value;
    this.authService.crearUsuario(nombre, correo, password).then(
      credenciales => {
        Swal.close();
        this.router.navigate(['/']);
      }
    ).catch(() => {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registro incorrecto, la clave debe tener min 6 digitos",
      });
    })
  }


}
