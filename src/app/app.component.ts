import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { BaseDestroyClass } from '@core/classes/base-destroy.class';
import { StoreLocalStorageService } from '@store/services/store-local-storage.service';
import { selectAuthToken } from '@store/selectors/auth.selector';
import { IRootState } from '@store/interfaces/root-state.interface';
import { BASE_REDIRECT_URL, LOGIN_URL } from './app.contants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseDestroyClass implements OnInit, OnDestroy {
  title = 'yam-software-test';

  private _beforeunloadCallback = (): void => this._saveStore();

  constructor(
    private readonly _storeLocalStorageService: StoreLocalStorageService,
    private readonly _store: Store<IRootState>,
    private readonly _router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', this._beforeunloadCallback);

    this._store.select(selectAuthToken)
      .pipe(
        takeUntil(this._onDestroy$),
      )
      .subscribe((token: string): void => {
        this._navigate(token);
      });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    window.removeEventListener('beforeunload', this._beforeunloadCallback)
  }

  private _saveStore(): void {
    this._storeLocalStorageService.saveStateToLocalStorage();
  }

  private _navigate(token: string): void {
    if (!!token) {
      this._router.navigate([BASE_REDIRECT_URL])
        .catch((): void => {
          throw new Error(`Can not navigate to ${BASE_REDIRECT_URL}`);
        });
    } else {
      this._router.navigate([LOGIN_URL])
        .catch((): void => {
          throw new Error(`Can not navigate to ${LOGIN_URL}`);
        });
    }
  }
}
