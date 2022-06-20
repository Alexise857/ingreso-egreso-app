import { ActionReducerMap } from "@ngrx/store";
import * as UI from "./shared/ui.reducer";
import * as AUTH  from "./auth/auth.reducer";

export interface AppState {
  ui: UI.State,
  auth: AUTH.State
}

export const appReducer: ActionReducerMap<AppState> = {
  ui: UI.uiReducer,
  auth: AUTH.authReducer
}
