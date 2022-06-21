import { ActionReducerMap } from "@ngrx/store";
import * as UI from "./shared/ui.reducer";
import * as AUTH  from "./auth/auth.reducer";
import * as INGRESO_EGRESO from "./ingreso-egreso/ingreso-egreso.reducer";

export interface AppState {
  ui: UI.State,
  auth: AUTH.State,
  // ingresosEgresos: INGRESO_EGRESO.State
}

export const appReducer: ActionReducerMap<AppState> = {
  ui: UI.uiReducer,
  auth: AUTH.authReducer,
  // ingresosEgresos: INGRESO_EGRESO.ingresoEgresoReducer
}
