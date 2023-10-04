import {Action} from '@ngrx/store';

export interface IAction<T = undefined> extends Action {
  payload?: T;
}
