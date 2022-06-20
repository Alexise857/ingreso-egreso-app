import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";

import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

import { Usuario } from "../model/usuario.model";
import { AppState } from "../app-reducer";
import * as AUTH from "../auth/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;

  constructor(
    public auth: AngularFireAuth,
    public fireStore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe( FUser => {
      if (FUser) {
        this.userSubscription = this.fireStore.doc(`${ FUser.uid }/usuario`).valueChanges()
          .subscribe( fireStore => {
            this.store.dispatch( AUTH.setUser( { user: Usuario.fromFireBase( fireStore ) } ) )
          } )
      } else {
        this.store.dispatch( AUTH.unSetUser() )
        if(this.userSubscription){
          this.userSubscription.unsubscribe();
        }
      }
    } )
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword( email, password )
          .then( fbUser => {
            const { user } = fbUser
            const newUser = new Usuario( user!.uid, nombre, user!.email! )
            return this.fireStore.doc( `${ user?.uid }/usuario` )
              .set({ ...newUser } )
          } )
  }

  signIn(email:string, password: string) {
    return this.auth.signInWithEmailAndPassword( email, password )
  }

  logout() {
   return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fuser => fuser !== null ? true : false )
    )  ;
  }

}
