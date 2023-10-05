import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { BASE_BE_URL_TOKEN, HTTP_REQUEST_TIMEOUT_TOKEN } from './app.tokens';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,

    AppRoutingModule,
  ],
  providers: [
    {provide: BASE_BE_URL_TOKEN, useValue: environment.baseBEUrl},
    {provide: HTTP_REQUEST_TIMEOUT_TOKEN, useValue: environment.httpRequestTimeout},
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
