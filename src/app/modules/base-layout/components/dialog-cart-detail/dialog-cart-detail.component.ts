import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { cartProductsAddAction, cartProductsRemoveAction, cartProductsResetAction, ICartProductsAddRemovePayload } from '@store/actions/cart.actions';
import { selectCartProducts, selectCartProductsTotalPrice } from '@store/selectors/cart.selectors';
import { IRootState } from '@store/interfaces/root-state.interface';
import { IRootStateCartProduct } from '@store/interfaces/root-state-cart.interface';

@Component({
  selector: 'app-dialog-cart-detail',
  templateUrl: './dialog-cart-detail.component.html',
  styleUrls: ['./dialog-cart-detail.component.scss'],
})
export class DialogCartDetailComponent {
  columns: Array<string> = ['image', 'title', 'price', 'count', 'actions']

  get products$(): Observable<Array<IRootStateCartProduct>> {
    return this._store.select(selectCartProducts);
  }

  get totalPrice$(): Observable<number> {
    return this._store.select(selectCartProductsTotalPrice);
  }

  constructor(
    private readonly _store: Store<IRootState>,
    private readonly _snackbar: MatSnackBar,
  ) {
  }

  getBackgroundImageStyleByProduct(product: IRootStateCartProduct): Record<string, string> {
    return {
      'background-image': `url("${product.image}")`,
    };
  }

  addProduct(product: IRootStateCartProduct): void {
    const payload: ICartProductsAddRemovePayload = {
      ...product,
    };
    this._store.dispatch(cartProductsAddAction({payload}));
  }

  removeProduct(product: IRootStateCartProduct): void {
    const payload: ICartProductsAddRemovePayload = {
      ...product,
    };
    this._store.dispatch(cartProductsRemoveAction({payload}));
  }

  resetCart(): void {
    this._store.dispatch(cartProductsResetAction());
  }

  buyProducts(): void {
    this._snackbar.open('To be continued ;)', 'Ok');
  }
}
