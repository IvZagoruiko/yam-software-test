import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { cartProductsAddAction, ICartProductsAddRemovePayload } from '@store/actions/cart.actions';
import { IRootState } from '@store/interfaces/root-state.interface';
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
      'background-image': `url("${this.product.image}")`,
    };
  }

  constructor(
    private readonly _store: Store<IRootState>,
  ) {
  }

  addProduct(): void {
    const payload: ICartProductsAddRemovePayload = {
      id: this.product.id,
      title: this.product.title,
      image: this.product.image,
      price: this.product.price,
    };
    this._store.dispatch(cartProductsAddAction({payload}));
  }
}
