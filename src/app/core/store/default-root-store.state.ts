import { IRootState } from './interfaces/root-state.interface';

export const defaultRootStoreState: IRootState = {
  auth: {
    token: null,
    userName: null,
    requestStatus: null,
    requestIsPending: false,
  },
};