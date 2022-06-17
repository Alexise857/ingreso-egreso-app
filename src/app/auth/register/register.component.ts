import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import Swal from "sweetalert2";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: [ '', Validators.required ],
      correo: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]
    })
  }

  crearUsuario() {

    if (this.registroForm.invalid) return

    // Aquí

    Swal.fire({
      title: 'Espere porfavor',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const { nombre, correo, password } = this.registroForm.value

    this.authService.crearUsuario( nombre, correo, password )
      .then( credenciales => {
        console.log( { credenciales } )
        // End
        Swal.close()
        this.router.navigate(['/'])
      } )
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      } )
  }

}
