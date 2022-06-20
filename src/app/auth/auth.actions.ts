import { createAction, props } from '@ngrx/store';
import { Usuario } from "../model/usuario.model";

enum USER_ACTIONS {
  SET_USER   = '[Auth] Set User',
  UNSET_USER = '[Auth] Unset User'
}

export const setUser   = createAction<USER_ACTIONS.SET_USER, { user: Usuario }>(
  USER_ACTIONS.SET_USER,
  props<{ user: Usuario }>()
);

export const unSetUser = createAction<USER_ACTIONS.UNSET_USER>(
  USER_ACTIONS.UNSET_USER
);
