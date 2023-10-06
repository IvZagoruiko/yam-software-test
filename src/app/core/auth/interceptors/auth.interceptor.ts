import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '@store/selectors/auth.selectors';
import { IRootState } from '@store/interfaces/root-state.interface';
import { HTTP_REQUEST_TIMEOUT_TOKEN } from '../../../app.tokens';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly _store: Store<IRootState>,
    @Inject(HTTP_REQUEST_TIMEOUT_TOKEN) private readonly _httpRequestTimeout: number,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._store.select(selectAuthToken)
      .pipe(
        take(1),
        switchMap((token: string): Observable<HttpEvent<any>> => {
          if (!token) {
            return next.handle(req);
          }

          const setHeaders = {
            'Authorization': `Bearer ${token}`,
          };
          return next.handle(req.clone({setHeaders}));
        }),
      );
  }
}
