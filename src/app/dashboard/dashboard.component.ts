import {Component, OnDestroy, OnInit} from '@angular/core';

import { Store } from "@ngrx/store";
import { AppState } from "../app-reducer";
import { Subscription } from "rxjs";
import * as INGRESO_EGRESO from "../ingreso-egreso/ingreso-egreso.actions";

import { filter } from "rxjs/operators";

import { IngresoEgresoService } from "../services/ingreso-egreso.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs!: Subscription
  ingresosEgresosSubs!: Subscription

  constructor( private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter( auth => auth.user !== null )
      ).subscribe(({ user }) => {

      this.ingresosEgresosSubs = this.ingresoEgresoService.initIngresosEgresosListener( user!.uid )
        .subscribe( ingresosEgresosFB => {

          this.store.dispatch( INGRESO_EGRESO.setItems( { items: ingresosEgresosFB } ) )

        } )
    } )
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe()
    this.ingresosEgresosSubs.unsubscribe()
  }

}
