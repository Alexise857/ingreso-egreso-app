import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { Store } from "@ngrx/store";

import Swal from "sweetalert2";

import { AuthService } from "../../services/auth.service";

import { AppState } from "../../app-reducer";
import * as UI  from "../../shared/ui.actions";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup
  loading!: boolean
  uiSubscription!: Subscription

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router ) { }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: [ '', Validators.required ],
      correo: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]
    })
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
                          this.loading = ui.isLoading
                          } )
  }

  crearUsuario() {

    if (this.registroForm.invalid) return

    // Aquí

    this.store.dispatch( UI.isLoading() )

/*    Swal.fire({
      title: 'Espere porfavor',
      didOpen: () => {
        Swal.showLoading()
      }
    })*/

    const { nombre, correo, password } = this.registroForm.value

    this.authService.crearUsuario( nombre, correo, password )
      .then( credenciales => {
        console.log( { credenciales } )
        // End
        // Swal.close()
        this.store.dispatch( UI.stopLoading() )
        this.router.navigate(['/'])
      } )
      .catch( err => {
        this.store.dispatch( UI.stopLoading() )
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      } )
  }

}
