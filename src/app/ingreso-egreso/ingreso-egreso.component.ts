import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";
import { IngresoEgreso } from "../model/ingreso-egreso.model";
import { AppState } from "../app-reducer";
import Swal from "sweetalert2";
import * as UI from "../shared/ui.actions";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm! : FormGroup
  tipo         : string = 'ingreso'
  loading      : boolean = false;
  loadingSubs!  : Subscription;

  constructor( private fb: FormBuilder,
               private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit(): void {

    this.loadingSubs = this.store.select('ui').subscribe( ({ isLoading }) => this.loading = isLoading )

    this.ingresoForm = this.fb.group({
      descripcion:['', Validators.required],
      monto:['', Validators.required],
    })
  }

  guardar() {

    if (this.ingresoForm.invalid) return

    this.store.dispatch( UI.isLoading() )

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo )

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( (ref) => {
        console.log('exito!', ref)
        Swal.fire('Registro Creado', descripcion, 'success')
        this.ingresoForm.reset()
        this.store.dispatch(  UI.stopLoading() )
      } )
      .catch( err => {
        Swal.fire('Error', err.message , 'error')
        console.warn(err)
        this.store.dispatch(  UI.stopLoading() )
      } )

  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }

}
