import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_BE_URL_TOKEN } from '../../../../../app.tokens';
import { IProductItem } from '../interfaces/product-item.interface';

@Injectable()
export class ProductsHttpService {

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(BASE_BE_URL_TOKEN) private readonly _baseUrl: string,
  ) {
  }

  getProducts(): Observable<Array<IProductItem>> {
    return this._httpClient.get<Array<IProductItem>>(`${this._baseUrl}/products`)
  }
}
