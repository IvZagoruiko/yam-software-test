import { Component, Input } from '@angular/core';
import { ProductEntity } from '../../entities/product.entity';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input()
  product: ProductEntity;

  get backgroundImageStyle(): Record<string, string> {
    return {
      "background-image": `url("${this.product.image}")`,
    };
  }

  constructor() {
  }
}
