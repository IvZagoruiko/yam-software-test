import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreLocalStorageService } from './core/store/services/store-local-storage.service';
import { IRootState } from './core/store/interfaces/root-state.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'yam-software-test';

  private _beforeunloadCallback = (): void => this._saveStore();

  constructor(
    private readonly _storeLocalStorageService: StoreLocalStorageService,
    private readonly _store: Store<IRootState>,
  ) {
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', this._beforeunloadCallback);
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this._beforeunloadCallback)
  }

  private _saveStore(): void {
    this._storeLocalStorageService.saveStateToLocalStorage();
  }
}
