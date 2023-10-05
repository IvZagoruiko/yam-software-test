import { Inject, Injectable } from '@angular/core';
import { HttpBackend, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, Observable, timeout } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFetchLoginActionPayload } from '@store/actions/auth.action';
import { BASE_BE_URL_TOKEN, HTTP_REQUEST_TIMEOUT_TOKEN } from '../../../app.tokens';
import { ILoginResponse } from '../interfaces/login-response.interface';

@Injectable()
export class AuthHttpService {

  constructor(
    private readonly _httpBackend: HttpBackend,
    @Inject(BASE_BE_URL_TOKEN) private readonly _baseUrl: string,
    @Inject(HTTP_REQUEST_TIMEOUT_TOKEN) private readonly _httpRequestTimeout: number,
  ) {
  }

  login(payload: IFetchLoginActionPayload): Observable<ILoginResponse> {
    const request = new HttpRequest<string>('POST', `${this._baseUrl}/auth/login`, JSON.stringify(payload));
    const setHeaders = {
      'Content-Type': 'application/json',
    };

    return this._handleRequest<ILoginResponse, string>(request.clone({setHeaders}));
  }

  private _handleRequest<Response, Body = undefined>(request: HttpRequest<Body>): Observable<Response> {
    return this._httpBackend.handle(request)
      .pipe(
        timeout(this._httpRequestTimeout),
        filter((response: HttpEvent<Response>): boolean => response.type === HttpEventType.Response),
        map((response: HttpResponse<Response>): Response => response.body),
      );
  }
}
