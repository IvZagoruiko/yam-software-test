import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { authInitFromLocalStorageAction } from '../actions/auth.action';
import { IRootState } from '../interfaces/root-state.interface';

@Injectable()
export class StoreLocalStorageService {
  private readonly _localStorageKey = 'yam-store';

  constructor(
    private readonly _store: Store<IRootState>,
  ) {
    this._initStoreFromLocalStorage();
  }

  saveStateToLocalStorage() {
    this._store.select((state: IRootState): IRootState => state)
      .pipe(
        take(1),
      )
      .subscribe((state: IRootState): void => {
        localStorage.setItem(this._localStorageKey, JSON.stringify(state));
      });
  }

  private _getStateFromLocalStorage(): IRootState {
    const savedState = localStorage.getItem(this._localStorageKey);
    localStorage.removeItem(this._localStorageKey);
    return savedState ? JSON.parse(savedState) : null;
  }

  private _initStoreFromLocalStorage(): void {
    const savedData = this._getStateFromLocalStorage();
    if (!savedData) {
      return;
    }

    if (!!savedData.auth) {
      const payload = savedData.auth;
      this._store.dispatch(authInitFromLocalStorageAction({payload}));
    }
  }
}
