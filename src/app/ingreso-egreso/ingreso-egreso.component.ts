import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'I';
  uiSubscription: Subscription;
  loading = false;

  constructor(private fb: FormBuilder,
    private ingresoegresoS: IngresoEgresoService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  public ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  guardar(): void {
    this.store.dispatch(isLoading());
    const {descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );
    this.ingresoegresoS.crearIngresoEgreso(ingresoEgreso);
    this.store.dispatch(stopLoading());
    this.ingresoForm.reset();
    this.tipo = 'I';
    
  }

}
