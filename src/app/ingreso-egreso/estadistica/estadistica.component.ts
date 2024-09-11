import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit  {

  ingresos = 0;
  egresos = 0;
  totalEgresos = 0;
  totalIngresos = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({items}) => {
      this.generarEstadistica(items);
    })
  }

  generarEstadistica(items: IngresoEgreso[]): any {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    items.forEach(element => {
      if (element.tipo === 'I') {
        this.ingresos += element.monto;
        this.totalIngresos ++;
      } else {
        this.egresos += element.monto;
        this.totalEgresos ++;
      }
    });    
  }
}
