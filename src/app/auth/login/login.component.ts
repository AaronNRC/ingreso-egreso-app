import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  public loginUser(): void {
    if (this.loginForm.invalid){
      return ;
    }
    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const {email, password} = this.loginForm.value;
    this.authService.loginUsuario(email, password).then(
      credentials => {
        console.log(credentials);
        this.router.navigate(['/']);
        Swal.close();
      }
    ).catch(() => {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login incorrecto!",
      });
    })
  }


}
