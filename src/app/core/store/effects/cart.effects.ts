import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AUTH_ACTIONS } from '@store/actions/auth.actions';
import { CART_ACTIONS } from '@store/actions/cart.actions';
import { IAction } from '@store/interfaces/action.interface';

@Injectable()
export class CartEffects {
  resetCart$ = createEffect(() =>
    this._actions$
      .pipe(
        ofType(AUTH_ACTIONS.LOGOUT),
        map((): IAction => ({type: CART_ACTIONS.PRODUCTS.RESET})),
      ),
  );

  constructor(
    private readonly _actions$: Actions,
  ) {
  }
}
