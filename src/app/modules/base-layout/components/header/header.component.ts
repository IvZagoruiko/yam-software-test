import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { logoutAction } from '@store/actions/auth.action';
import { selectAuthUserName } from '@store/selectors/auth.selector';
import { IRootState } from '@store/interfaces/root-state.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  get userName$(): Observable<string> {
    return this._store.select(selectAuthUserName);
  }

  constructor(
    private readonly _store: Store<IRootState>,
  ) {
  }

  logOut(): void {
    this._store.dispatch(logoutAction());
  }
}
