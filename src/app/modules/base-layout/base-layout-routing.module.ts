import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BaseLayoutComponent } from './base-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
      {
        path: 'products',
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class BaseLayoutRoutingModule {
}
