import { IRootStateAuth } from '@store/interfaces/root-state-auth.interface';
import { IRootStateCart } from '@store/interfaces/root-state-cart.interface';

export interface IRootState {
  auth: IRootStateAuth;
  cart: IRootStateCart;
}
