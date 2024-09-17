import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  nameUser = '';
  susbcription: Subscription;

  constructor(private autService: AuthService, private router: Router,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.susbcription = this.store.select('user').subscribe(({user}) => {
      this.nameUser = user?.nombre;
    })
  }

  ngOnDestroy(): void {
    this.susbcription.unsubscribe();
  }

  public logout(): void {
    this.autService.logout().then(() => {
      this.router.navigate(['/login'])
    })
    
  }
}
