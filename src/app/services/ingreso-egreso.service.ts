import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { IngresoEgreso } from "../model/ingreso-egreso.model";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ){
    console.log({ingresoEgreso})
    const { uid: uidi2, ...ingresoEgresoData } = ingresoEgreso
    const uid = this.authService.User?.uid

    return this.fireStore.doc(`${ uid }/ingreso-egreso`)
      .collection( 'items' )
      .add({...ingresoEgresoData} )
  }

  initIngresosEgresosListener( uid: string ){

    return this.fireStore.collection<IngresoEgreso>(`${ uid }/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => {
          return snapshot.map( doc => ({
            ...doc.payload.doc.data(),
            uid: doc.payload.doc.id
          })
          )
        } )
      )

  }

  borrarIngresoEgreso( uidItem: string ){
    const uid = this.authService.User?.uid
    return this.fireStore.doc(`${ uid }/ingreso-egreso/items/${ uidItem }`).delete()
  }

}
