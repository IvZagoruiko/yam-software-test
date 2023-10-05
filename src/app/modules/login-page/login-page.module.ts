import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';


@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    SharedModule,
    LoginPageRoutingModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginPageModule {
}
