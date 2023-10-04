import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
import { authReducer } from './reducers/auth.reducer';
import { AuthEffects } from './effects/auth.effects';
import { StoreLocalStorageService } from './services/store-local-storage.service';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      auth: authReducer,
    }),
    EffectsModule.forRoot([
      AuthEffects,
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
