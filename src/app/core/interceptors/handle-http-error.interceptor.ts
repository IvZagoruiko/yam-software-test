import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HTTP_REQUEST_TIMEOUT_TOKEN } from '../../app.tokens';

@Injectable()
export class HandleHttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly _snackbar: MatSnackBar,
    @Inject(HTTP_REQUEST_TIMEOUT_TOKEN) private readonly _httpRequestTimeout: number,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        timeout(this._httpRequestTimeout),
        catchError((error: HttpErrorResponse): Observable<never> => {
          this._snackbar.open(error.message, 'Ok');

          return throwError((): HttpErrorResponse => error);
        })
      )
  }
}
