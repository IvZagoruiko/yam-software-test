import { createSelector } from '@ngrx/store';
import { IRootState } from '../interfaces/root-state.interface';
import { IRootStateAuth } from '../interfaces/root-state-auth.interface';

const selectAuth = (state: IRootState): IRootStateAuth => state.auth;

export const selectAuthToken = createSelector(
  selectAuth,
  (state: IRootStateAuth): string => state.token,
);

export const selectAuthUserName = createSelector(
  selectAuth,
  (state: IRootStateAuth): string => state.userName,
);

export const selectAuthRequestStatus = createSelector(
  selectAuth,
  (state: IRootStateAuth): number => state.requestStatus,
);

export const selectAuthRequestIsPending = createSelector(
  selectAuth,
  (state: IRootStateAuth): boolean => state.requestIsPending,
);
