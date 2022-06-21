import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import {AuthGuard} from "./services/auth.guard";

/* Nota:
*  El canActive indica que el modulo va a cargar,
*  Para hacer algo antes que cargue el modulo, osea canLoad
* */

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    // canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    path: '',
    loadChildren:() => import('./ingreso-egreso/ingreso-egreso.module')
                              .then(m => m.IngresoEgresoModule)
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule {

}
