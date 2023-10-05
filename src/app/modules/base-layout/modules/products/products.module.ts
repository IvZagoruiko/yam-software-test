import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsHttpService } from './services/products-http.service';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,

    ScrollingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [
    ProductsHttpService,
  ],
})
export class ProductsModule {
}
