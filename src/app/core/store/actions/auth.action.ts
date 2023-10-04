import { createAction, props } from '@ngrx/store';
import { IRootStateAuth } from '../interfaces/root-state-auth.interface';

const actionGroupName = 'Auth';
export const AUTH_ACTIONS = {
  INIT_FROM_LOCAL_STORAGE: `[${actionGroupName}] Init from local storage`,
  LOGIN: {
    FETCH: `[${actionGroupName}] Fetch login`,
    FILL: {
      RESOLVE: `[${actionGroupName}] Fill resolve login`,
      REJECT: `[${actionGroupName}] Fill reject login`,
    },
  },
  LOGOUT: `[${actionGroupName}] Fill logout`,
  RESET_STATUS: `[${actionGroupName}] Reset status`,
};

export const authInitFromLocalStorageAction = createAction(
  AUTH_ACTIONS.INIT_FROM_LOCAL_STORAGE,
  props<{ payload: IRootStateAuth }>(),
);

export interface IFetchLoginActionPayload {
  username: string;
  password: string;
}
export const fetchLoginAction = createAction(
  AUTH_ACTIONS.LOGIN.FETCH,
  props<{ payload: IFetchLoginActionPayload }>(),
);

export const fillResolveLoginAction = createAction(
  AUTH_ACTIONS.LOGIN.FILL.RESOLVE,
  props<{ payload: IRootStateAuth }>(),
);

export interface IFillRejectLoginActionPayload {
  status: number;
}
export const fillRejectLoginAction = createAction(
  AUTH_ACTIONS.LOGIN.FILL.REJECT,
  props<{ payload: IFillRejectLoginActionPayload }>(),
);

export const fillLogoutAction = createAction(
  AUTH_ACTIONS.LOGOUT,
);

export const authResetStatusAction = createAction(
  AUTH_ACTIONS.RESET_STATUS,
);
