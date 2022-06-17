import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs/operators";
import { Usuario } from "../model/usuario.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public fireStore: AngularFirestore
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe( FUser => {
      console.log({ FUser })
    } )
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword( email, password )
          .then( fbUser => {

            const { user } = fbUser

            const newUser = new Usuario( user!.uid, nombre, user!.email! )
            return this.fireStore.doc( `${ user?.uid }/usuario  ` )
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
