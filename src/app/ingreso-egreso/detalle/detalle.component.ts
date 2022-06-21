import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../app-reducer";
import { IngresoEgreso } from "../../model/ingreso-egreso.model";
import { Subscription } from "rxjs";
import { IngresoEgresoService } from "../../services/ingreso-egreso.service";
import { AppStateWithIngreso } from "../ingreso-egreso.reducer";

import Swal from "sweetalert2";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgresoList: IngresoEgreso[] = []
  ingresosSubs!: Subscription

  constructor( private store: Store<AppStateWithIngreso>,
               private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresosEgresos').subscribe( ({ items }) => {
      this.ingresoEgresoList = items
    } )
  }

  borrar(uid?: string) {
    console.log(uid)
    this.ingresoEgresoService.borrarIngresoEgreso(uid!)
      .then( () => Swal.fire('Borrado', 'Item Borrado', 'success') )
      .catch( error => Swal.fire('Borrado', error.message, 'error') )
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe()
  }
}
