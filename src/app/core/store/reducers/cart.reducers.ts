import { createReducer, on } from '@ngrx/store';
import { defaultRootStoreState } from '@store/default-root-store.state';
import {
  cartInitFromLocalStorageAction,
  cartProductsAddAction,
  cartProductsRemoveAction,
  cartProductsResetAction,
  ICartProductsAddRemovePayload,
} from '@store/actions/cart.actions';
import { IAction } from '@store/interfaces/action.interface';
import { IRootStateCart, IRootStateCartProduct } from '@store/interfaces/root-state-cart.interface';

const cartInitFromLocalStorage = (state: IRootStateCart, action: IAction<IRootStateCart>): IRootStateCart => {
  return {
    ...state,
    ...action.payload,
  };
};

const cartProductsAdd = (state: IRootStateCart, action: IAction<ICartProductsAddRemovePayload>): IRootStateCart => {
  let productUpdated = false;
  const products = state.products.map((item: IRootStateCartProduct): IRootStateCartProduct => {
    if (item.id === action.payload.id) {
      productUpdated = true;
      return {...item, count: item.count + 1};
    }

    return item;
  });

  if (!productUpdated) {
    products.push({...action.payload, count: 1});
  }

  return {
    ...state,
    products,
  }
};

const cartProductsRemove = (state: IRootStateCart, action: IAction<ICartProductsAddRemovePayload>): IRootStateCart => {
  const products: Array<IRootStateCartProduct> = [];
  state.products.forEach((item: IRootStateCartProduct): void => {
    if (item.id !== action.payload.id) {
      products.push(item);
    } else if (item.count > 1) {
      products.push({...item, count: item.count - 1});
    }
  });

  return {
    ...state,
    products,
  };
};

const cartProductsReset = (state: IRootStateCart): IRootStateCart => {
  return {
    ...state,
    products: defaultRootStoreState.cart.products,
  };
};

const cartReducerBuilder = createReducer(
  defaultRootStoreState.cart,
  on(cartInitFromLocalStorageAction, cartInitFromLocalStorage),
  on(cartProductsAddAction, cartProductsAdd),
  on(cartProductsRemoveAction, cartProductsRemove),
  on(cartProductsResetAction, cartProductsReset),
);

export function cartReducers(state: IRootStateCart, action: IAction): IRootStateCart {
  return cartReducerBuilder(state, action);
}
