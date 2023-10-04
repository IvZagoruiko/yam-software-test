import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BASE_BE_URL, HTTP_REQUEST_TIMEOUT } from './app.tokens';
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
    {provide: BASE_BE_URL, useValue: environment.baseBEUrl},
    {provide: HTTP_REQUEST_TIMEOUT, useValue: environment.httpRequestTimeout},
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
