import { IRootState } from './interfaces/root-state.interface';

export const defaultStoreState: IRootState = {
  auth: {
    token: null,
    userName: null,
    status: null,
  },
};
