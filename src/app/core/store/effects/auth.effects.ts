import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthHttpService } from '../../auth/services/auth-http.service';
import { ILoginResponse } from '../../auth/interfaces/login-response.interface';
import { AUTH_ACTIONS, IFetchLoginActionPayload, IFillRejectLoginActionPayload } from '../actions/auth.action';
import { IAction } from '../interfaces/action.interface';
import { IRootStateAuth } from '../interfaces/root-state-auth.interface';

@Injectable()
export class AuthEffects {
  tryLogin$ = createEffect(() =>
    this._actions$
      .pipe(
        ofType(AUTH_ACTIONS.LOGIN.FETCH),
        exhaustMap(({payload}: IAction<IFetchLoginActionPayload>): Observable<IAction<IRootStateAuth | IFillRejectLoginActionPayload>> => {
          return this._authHttpService.login(payload)
            .pipe(
              map((response: ILoginResponse): IAction<IRootStateAuth> => ({
                type: AUTH_ACTIONS.LOGIN.FILL.RESOLVE,
                payload: {
                  token: response.token,
                  userName: payload.username,
                  status: 200,
                },
              })),
              catchError((error: HttpErrorResponse): Observable<IAction<IFillRejectLoginActionPayload>> => {
                return of({
                  type: AUTH_ACTIONS.LOGIN.FILL.REJECT,
                  payload: {
                    status: error.status,
                  },
                });
              }),
            );
        }),
      ),
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _authHttpService: AuthHttpService,
  ) {
  }
}
