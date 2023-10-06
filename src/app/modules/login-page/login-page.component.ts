import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { BaseDestroyClass } from '@core/classes/base-destroy.class';
import { authResetStatusAction, fetchLoginAction } from '@store/actions/auth.actions';
import { selectAuthRequestData } from '@store/selectors/auth.selectors';
import { IRootState } from '@store/interfaces/root-state.interface';
import { IRootStateAuthRequestData } from '@store/interfaces/root-state-auth.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends BaseDestroyClass implements OnInit {
  form: FormGroup;

  isPending = false;
  private _status: number;

  get usernameError(): string {
    const control = this.form?.get('username');
    if (!control || control.valid) {
      return '';
    }

    if (control.errors['required']) {
      return 'User name is required';
    }

    return '';
  }

  get passwordError(): string {
    const control = this.form?.get('password');
    if (!control || control.valid) {
      return '';
    }

    if (control.errors['required']) {
      return 'Password is required';
    }

    if (control.errors['minlength']) {
      return `Passwords min length is ${control.errors['minlength']['requiredLength']}`;
    }

    return '';
  }

  get showStatusError(): boolean {
    return !!this._status && this._status > 399;
  }

  get incorrectDataError(): boolean {
    return this._status === 401;
  }

  get disabledLogIn(): boolean {
    return !this.form?.valid || this.isPending || this._status === 200;
  }

  constructor(
    private readonly _store: Store<IRootState>,
  ) {
    super();
  }

  ngOnInit(): void {
    this._createForm();

    this._storeSubscribe();
  }

  logIn(): void {
    this.isPending = true;
    this._store.dispatch(fetchLoginAction({payload: this.form.value}));
  }

  private _createForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.form.valueChanges
      .pipe(
        takeUntil(this._onDestroy$),
      )
      .subscribe((): void => {
        this._store.dispatch(authResetStatusAction());
      });
  }

  private _storeSubscribe(): void {
    this._store.select(selectAuthRequestData)
      .pipe(
        takeUntil(this._onDestroy$),
      )
      .subscribe((requestData: IRootStateAuthRequestData): void => {
        this._status = requestData.status;
        this.isPending = requestData.isPending;
      });
  }
}
