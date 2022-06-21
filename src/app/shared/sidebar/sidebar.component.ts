import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AuthService } from "../../services/auth.service";
import { AppState } from "../../app-reducer";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  userName?: string;
  uiSubscription!: Subscription

  constructor( private auth: AuthService,
               private router: Router,
               private store: Store<AppState>) { }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('auth').subscribe( (auth) => {
      this.userName = auth.user?.nombre
    } )
  }

  logout() {
    this.auth.logout().then( () => {
      console.log('login out')
      this.router.navigate(['/login'])
    } )

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }
}
