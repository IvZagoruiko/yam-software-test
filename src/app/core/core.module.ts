import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RootStoreModule } from './store/root-store.module';
import { AuthHttpService } from './auth/services/auth-http.service';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { HandleHttpErrorInterceptor } from './interceptors/handle-http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RootStoreModule,

    MatSnackBarModule,
  ],
  providers: [
    AuthHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleHttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
}
