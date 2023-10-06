import { createReducer, on } from '@ngrx/store';
import { defaultRootStoreState } from '@store/default-root-store.state';
import {
  authInitFromLocalStorageAction,
  authResetStatusAction,
  fetchLoginAction,
  fillRejectLoginAction,
  fillResolveLoginAction,
  IFillRejectLoginActionPayload,
  IFillResolveLoginActonPayload,
  logoutAction,
} from '@store/actions/auth.actions';
import { IAction } from '@store/interfaces/action.interface';
import { IRootStateAuth } from '@store/interfaces/root-state-auth.interface';


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
      status: defaultRootStoreState.auth.requestData.status,
    },
  };
};

const authReducerBuilder = createReducer(
  defaultRootStoreState.auth,
  on(authInitFromLocalStorageAction, authInitFromLocalStorage),
  on(fetchLoginAction, fetchLogin),
  on(fillResolveLoginAction, fillResolveLogin),
  on(fillRejectLoginAction, fillRejectLogin),
  on(logoutAction, logout),
  on(authResetStatusAction, authResetStatus),
);

export function authReducers(state: IRootStateAuth, action: IAction): IRootStateAuth {
  return authReducerBuilder(state, action);
}
