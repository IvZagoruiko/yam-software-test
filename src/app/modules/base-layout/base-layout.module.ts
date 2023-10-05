import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@shared/shared.module';
import { BaseLayoutRoutingModule } from './base-layout-routing.module';
import { BaseLayoutComponent } from './base-layout.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    BaseLayoutComponent,
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    BaseLayoutRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class BaseLayoutModule {
}
