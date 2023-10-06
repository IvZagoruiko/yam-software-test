import { createSelector } from '@ngrx/store';
import { IRootState } from '@store/interfaces/root-state.interface';
import { IRootStateCart, IRootStateCartProduct } from '@store/interfaces/root-state-cart.interface';

const selectCart = (state: IRootState): IRootStateCart => state.cart;

export const selectCartProducts = createSelector(
  selectCart,
  (state: IRootStateCart): Array<IRootStateCartProduct> => state.products,
);

export const selectCartProductsCount = createSelector(
  selectCart,
  (state: IRootStateCart): number => state.products.reduce<number>((acc: number, product: IRootStateCartProduct): number => acc + product.count, 0),
);

export const selectCartProductsTotalPrice = createSelector(
  selectCart,
  (state: IRootStateCart): number => state.products.reduce<number>((acc: number, product: IRootStateCartProduct): number => acc + product.price * product.count, 0),
);
