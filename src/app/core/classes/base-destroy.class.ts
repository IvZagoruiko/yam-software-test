import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class BaseDestroyClass implements OnDestroy {
  protected readonly _onDestroy$: Subject<void> = new Subject<void>();

  protected constructor() {
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
