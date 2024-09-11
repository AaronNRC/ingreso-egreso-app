import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  items = [];
  subscribe: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingregoEgresoS: IngresoEgresoService
  ){}

  ngOnInit(): void {
    this.subscribe = this.store.select('ingresosEgresos').subscribe(ingresos => {
      this.items = ingresos.items;
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  deleteItem(uid: string): void {
    this.ingregoEgresoS.deleteItem(uid)
    .then( () => Swal.fire('Eliminado', 'Item eliminado', 'success'))
    .catch( err => Swal.fire('Error', err.message, 'error'))
  }
  
}
