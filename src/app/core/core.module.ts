import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthorizedGuard } from '@core/auth/guards/authorized.guard';
import { NotAuthorizedGuard } from '@core/auth/guards/not-authorized.guard';
import { RootStoreModule } from '@store/root-store.module';
import { AuthHttpService } from './auth/services/auth-http.service';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { HandleHttpErrorInterceptor } from './interceptors/handle-http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    RootStoreModule,

    MatSnackBarModule,
  ],
  providers: [
    AuthHttpService,

    AuthorizedGuard,
    NotAuthorizedGuard,

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
