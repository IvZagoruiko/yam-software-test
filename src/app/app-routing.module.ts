import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from '@core/auth/guards/authorized.guard';
import { NotAuthorizedGuard } from '@core/auth/guards/not-authorized.guard';
import { BASE_REDIRECT_URL, LOGIN_URL } from './app.contants';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: LOGIN_URL,
      },
      {
        path: BASE_REDIRECT_URL,
        pathMatch: 'full',
        redirectTo: 'base',
      },
      {
        path: LOGIN_URL,
        loadChildren: () => import('./modules/login-page/login-page.module').then(m => m.LoginPageModule),
        canActivate: [NotAuthorizedGuard],
      },
      {
        path: 'base',
        loadChildren: () => import('./modules/base-layout/base-layout.module').then(m => m.BaseLayoutModule),
        canActivate: [AuthorizedGuard],
      },
      {
        path: '**',
        redirectTo: LOGIN_URL,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
