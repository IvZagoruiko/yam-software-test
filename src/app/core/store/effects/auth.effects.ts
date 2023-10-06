import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthHttpService } from '@core/auth/services/auth-http.service';
import { ILoginResponse } from '@core/auth/interfaces/login-response.interface';
import { AUTH_ACTIONS, IFetchLoginActionPayload, IFillRejectLoginActionPayload, IFillResolveLoginActonPayload } from '@store/actions/auth.actions';
import { IAction } from '@store/interfaces/action.interface';

@Injectable()
export class AuthEffects {
  tryLogin$ = createEffect(() =>
    this._actions$
      .pipe(
        ofType(AUTH_ACTIONS.LOGIN.FETCH),
        exhaustMap(({payload}: IAction<IFetchLoginActionPayload>): Observable<IAction<IFillResolveLoginActonPayload | IFillRejectLoginActionPayload>> => {
          return this._authHttpService.login(payload)
            .pipe(
              map((response: ILoginResponse): IAction<IFillResolveLoginActonPayload> => ({
                type: AUTH_ACTIONS.LOGIN.FILL.RESOLVE,
                payload: {
                  token: response.token,
                  userName: payload.username,
                  requestStatus: 200,
                },
              })),
              catchError((error: HttpErrorResponse): Observable<IAction<IFillRejectLoginActionPayload>> => {
                return of({
                  type: AUTH_ACTIONS.LOGIN.FILL.REJECT,
                  payload: {
                    requestStatus: error.status,
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
