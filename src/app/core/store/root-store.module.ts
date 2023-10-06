import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
import { authReducers } from '@store/reducers/auth.reducers';
import { cartReducers } from '@store/reducers/cart.reducers';
import { AuthEffects } from '@store/effects/auth.effects';
import { CartEffects } from '@store/effects/cart.effects';
import { StoreLocalStorageService } from '@store/services/store-local-storage.service';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      auth: authReducers,
      cart: cartReducers,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      CartEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    StoreLocalStorageService,
  ]
})
export class RootStoreModule {
}
