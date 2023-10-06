import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { BaseLayoutRoutingModule } from './base-layout-routing.module';
import { BaseLayoutComponent } from './base-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogCartDetailComponent } from './components/dialog-cart-detail/dialog-cart-detail.component';


@NgModule({
  declarations: [
    BaseLayoutComponent,
    HeaderComponent,
    DialogCartDetailComponent,
  ],
  imports: [
    SharedModule,
    BaseLayoutRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
  ],
})
export class BaseLayoutModule {
}
