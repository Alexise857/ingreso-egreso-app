import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from "../model/ingreso-egreso.model";

enum INGRESO_EGRESO_ACTIONS {
  SET_ITEMS   = '[Ingreso Egreso] Set Items',
  UNSET_ITEMS = '[Ingreso Egreso] Unset Items',
}

export const setItems = createAction<
  INGRESO_EGRESO_ACTIONS.SET_ITEMS, { items: IngresoEgreso[] } >(
  INGRESO_EGRESO_ACTIONS.SET_ITEMS,
  props<{ items: [] }>()
);

export const unsetItems = createAction<INGRESO_EGRESO_ACTIONS.UNSET_ITEMS>(
  INGRESO_EGRESO_ACTIONS.UNSET_ITEMS
);
