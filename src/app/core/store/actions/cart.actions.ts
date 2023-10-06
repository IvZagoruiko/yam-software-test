import { createAction, props } from '@ngrx/store';
import { IRootStateCart } from '@store/interfaces/root-state-cart.interface';

const actionGroupName = 'Cart';
export const CART_ACTIONS = {
  INIT_FROM_LOCAL_STORAGE: `[${actionGroupName}] Init from local storage`,
  PRODUCTS: {
    ADD: `[${actionGroupName}] Add product`,
    REMOVE: `[${actionGroupName}] Remove product`,
    RESET: `[${actionGroupName}] Reset products`,
  },
};

export const cartInitFromLocalStorageAction = createAction(
  CART_ACTIONS.INIT_FROM_LOCAL_STORAGE,
  props<{ payload: IRootStateCart }>(),
);


export interface ICartProductsAddRemovePayload {
  id: number;
  title: string;
  image: string;
  price: number;
}
export const cartProductsAddAction = createAction(
  CART_ACTIONS.PRODUCTS.ADD,
  props<{ payload: ICartProductsAddRemovePayload }>(),
);
export const cartProductsRemoveAction = createAction(
  CART_ACTIONS.PRODUCTS.REMOVE,
  props<{ payload: ICartProductsAddRemovePayload }>(),
);

export const cartProductsResetAction = createAction(
  CART_ACTIONS.PRODUCTS.RESET,
);
