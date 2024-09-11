import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  ingresosSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoService: IngresoEgresoService
  ){

  }

  ngOnInit(): void {
    this.subscription = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(({user}) => {
    this.ingresosSubscription = this.ingresoService.initIngresosEgresosListener(user.uid)
      .subscribe( items => {
        this.store.dispatch(setItems({items: items}))
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.ingresosSubscription.unsubscribe();
  }

}
