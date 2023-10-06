import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '@store/selectors/auth.selectors';
import { IRootState } from '@store/interfaces/root-state.interface';

@Injectable()
export class AuthorizedGuard implements CanActivate {

  constructor(
    private readonly _store: Store<IRootState>,
    private readonly _router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._store.select(selectAuthToken)
      .pipe(
        map((token: string): boolean => !!token),
      )
  }
}
