import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private auth: AuthService,
               private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.isAuth().pipe(
      // Tap para disparar un efecto secundario
      tap( estado => {
        if (!estado) this.router.navigate(['/login'])
      }  )
    );
  }

  /*
  * El canLoad dispara la subscripcion cuando se carga, se realiza una nueva peticion
  * por eso usamos el operador take
  * */

  canLoad(): Observable<boolean> {
    return this.auth.isAuth().pipe(
      // Tap para disparar un efecto secundario
      tap( estado => {
        if (!estado) this.router.navigate(['/login'])
      }  ),
      take(1)
    );
  }

}
