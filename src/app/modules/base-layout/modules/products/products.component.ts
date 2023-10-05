import { Component, OnInit } from '@angular/core';
import { ProductsDatasource } from './datasources/products.datasource';
import { ProductsHttpService } from './services/products-http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit { // TODO scroll css

  productsDataSource: ProductsDatasource = new ProductsDatasource(this._productsHttpService);

  constructor(
    private readonly _productsHttpService: ProductsHttpService,
  ) {
  }

  ngOnInit(): void {
  }

}
