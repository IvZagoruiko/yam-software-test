import { createReducer, on } from '@ngrx/store';
import { defaultStoreState } from '../default-store.state';
import {
  authInitFromLocalStorageAction,
  authResetStatusAction,
  fillLogoutAction,
  fillRejectLoginAction,
  fillResolveLoginAction,
  IFillRejectLoginActionPayload,
} from '../actions/auth.action';
import { IAction } from '../interfaces/action.interface';
import { IRootStateAuth } from '../interfaces/root-state-auth.interface';

const authInitFromLocalStorage = (state: IRootStateAuth, action: IAction<IRootStateAuth>): IRootStateAuth => {
  return {
    ...state,
    ...action.payload,
    status: null,
  };
};

const fillResolveLogin = (state: IRootStateAuth, action: IAction<IRootStateAuth>): IRootStateAuth => {
  return {
    ...state,
    ...action.payload,
  };
};

const fillRejectLogin = (state: IRootStateAuth, action: IAction<IFillRejectLoginActionPayload>): IRootStateAuth => {
  return {
    ...state,
    token: null,
    userName: null,
    status: action.payload.status,
  };
};

const fillLogout = (state: IRootStateAuth): IRootStateAuth => {
  return {
    ...state,
    ...defaultStoreState.auth,
  };
};

const authResetStatus = (state: IRootStateAuth): IRootStateAuth => {
  return {
    ...state,
    status: null,
  };
};

export const authReducerBuilder = createReducer(
  defaultStoreState.auth,
  on(authInitFromLocalStorageAction, authInitFromLocalStorage),
  on(fillResolveLoginAction, fillResolveLogin),
  on(fillRejectLoginAction, fillRejectLogin),
  on(fillLogoutAction, fillLogout),
  on(authResetStatusAction, authResetStatus),
);

export function authReducer(state: IRootStateAuth, action: IAction): IRootStateAuth {
  return authReducerBuilder(state, action);
}
