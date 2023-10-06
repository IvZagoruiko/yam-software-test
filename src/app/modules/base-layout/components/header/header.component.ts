import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { logoutAction } from '@store/actions/auth.actions';
import { selectAuthUserName } from '@store/selectors/auth.selectors';
import { selectCartProductsCount } from '@store/selectors/cart.selectors';
import { IRootState } from '@store/interfaces/root-state.interface';
import { DialogCartDetailComponent } from '../dialog-cart-detail/dialog-cart-detail.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  get userName$(): Observable<string> {
    return this._store.select(selectAuthUserName);
  }

  get cartProductsCount$(): Observable<number> {
    return this._store.select(selectCartProductsCount);
  }

  constructor(
    private readonly _store: Store<IRootState>,
    private readonly _matDialog: MatDialog,
  ) {
  }

  openCart(): void {
    this._matDialog.open(DialogCartDetailComponent, {
      width: '1200px',
    });
  }

  logOut(): void {
    this._store.dispatch(logoutAction());
  }
}
