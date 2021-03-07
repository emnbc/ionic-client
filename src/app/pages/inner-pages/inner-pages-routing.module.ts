import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthGuard } from '../../guards/is-auth.guard';

import { InnerPagesPage } from './inner-pages.page';

const routes: Routes = [
  {
    path: '',
    component: InnerPagesPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePagePageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users-page/users-page.module').then(m => m.UsersPagePageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about-page/about-page.module').then(m => m.AboutPagePageModule)
      }
    ],
    canActivateChild: [IsAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InnerPagesPageRoutingModule {}
