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
    requestData: {
      status: null,
      isPending: false,
    },
  };
};

const fetchLogin = (state: IRootStateAuth): IRootStateAuth => {
  return {
    ...state,
    requestData: {
      status: null,
      isPending: true,
    },
  };
};

const fillResolveLogin = (state: IRootStateAuth, action: IAction<IFillResolveLoginActonPayload>): IRootStateAuth => {
  return {
    ...state,
    token: action.payload.token,
    userName: action.payload.userName,
    requestData: {
      status: action.payload.requestStatus,
      isPending: false,
    },
  };
};

const fillRejectLogin = (state: IRootStateAuth, action: IAction<IFillRejectLoginActionPayload>): IRootStateAuth => {
  return {
    ...state,
    token: null,
    userName: null,
    requestData: {
      status: action.payload.requestStatus,
      isPending: false,
    },
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
    requestData: {
      ...state.requestData,
      status: null,
    },
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
