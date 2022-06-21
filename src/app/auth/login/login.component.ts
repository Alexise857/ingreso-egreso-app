import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Store } from "@ngrx/store";

import { AppState } from "../../app-reducer";

import Swal from 'sweetalert2';
import { AuthService } from "../../services/auth.service";
import * as UI from "../../shared/ui.actions";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup
  loading!: boolean
  uiSubscription!: Subscription

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) { }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    this.uiSubscription = this.store.select('ui').subscribe( (ui) => {
                          this.loading = ui.isLoading
                          } )
  }

  loginUser() {

    if ( this.loginForm.invalid ) return

    this.store.dispatch( UI.isLoading() )

/*    Swal.fire({
      title: 'Espere porfavor',
      didOpen: () => {
        Swal.showLoading()
      }
    })*/

    const { email, password } = this.loginForm.value

    this.authService.signIn( email, password )
      .then( user => {
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
        console.error(err)
      } )

  }
}
