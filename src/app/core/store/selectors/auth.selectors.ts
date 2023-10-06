import { createSelector } from '@ngrx/store';
import { IRootState } from '@store/interfaces/root-state.interface';
import { IRootStateAuth, IRootStateAuthRequestData } from '@store/interfaces/root-state-auth.interface';

const selectAuth = (state: IRootState): IRootStateAuth => state.auth;

export const selectAuthToken = createSelector(
  selectAuth,
  (state: IRootStateAuth): string => state.token,
);

export const selectAuthUserName = createSelector(
  selectAuth,
  (state: IRootStateAuth): string => state.userName,
);

export const selectAuthRequestData = createSelector(
  selectAuth,
  (state: IRootStateAuth): IRootStateAuthRequestData => state.requestData,
);
