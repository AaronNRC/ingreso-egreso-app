import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ){}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  public ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  public loginUser(): void {
    if (this.loginForm.invalid){
      return ;
    }
    this.store.dispatch(isLoading());
    const {email, password} = this.loginForm.value;
    this.authService.loginUsuario(email, password).then(
      credentials => {
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      }
    ).catch(() => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login incorrecto!",
      });
    })
  }


}
