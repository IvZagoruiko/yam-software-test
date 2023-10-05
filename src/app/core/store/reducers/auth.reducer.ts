import { createReducer, on } from '@ngrx/store';
import { defaultRootStoreState } from '../default-root-store.state';
import {
  authInitFromLocalStorageAction,
  authResetStatusAction,
  fetchLoginAction,
  fillRejectLoginAction,
  fillResolveLoginAction,
  IFillRejectLoginActionPayload,
  IFillResolveLoginActonPayload,
  logoutAction,
} from '../actions/auth.action';
import { IAction } from '../interfaces/action.interface';
import { IRootStateAuth } from '../interfaces/root-state-auth.interface';

const authInitFromLocalStorage = (state: IRootStateAuth, action: IAction<IRootStateAuth>): IRootStateAuth => {
  return {
    ...state,
    ...action.payload,
    requestStatus: null,
    requestIsPending: false,
  };
};

const fetchLogin = (state: IRootStateAuth): IRootStateAuth => {
  return {
    ...state,
    requestIsPending: true,
  };
};

const fillResolveLogin = (state: IRootStateAuth, action: IAction<IFillResolveLoginActonPayload>): IRootStateAuth => {
  return {
    ...state,
    ...action.payload,
    requestIsPending: false,
  };
};

const fillRejectLogin = (state: IRootStateAuth, action: IAction<IFillRejectLoginActionPayload>): IRootStateAuth => {
  return {
    ...state,
    token: null,
    userName: null,
    requestStatus: action.payload.requestStatus,
    requestIsPending: false,
  };
};

const logout = (state: IRootStateAuth): IRootStateAuth => {
  return {
    ...state,
    ...defaultRootStoreState.auth,
  };
};

const authResetStatus = (state: IRootStateAuth): IRootStateAuth => {
  return {
    ...state,
    requestStatus: null,
  };
};

export const authReducerBuilder = createReducer(
  defaultRootStoreState.auth,
  on(authInitFromLocalStorageAction, authInitFromLocalStorage),
  on(fetchLoginAction, fetchLogin),
  on(fillResolveLoginAction, fillResolveLogin),
  on(fillRejectLoginAction, fillRejectLogin),
  on(logoutAction, logout),
  on(authResetStatusAction, authResetStatus),
);

export function authReducer(state: IRootStateAuth, action: IAction): IRootStateAuth {
  return authReducerBuilder(state, action);
}
