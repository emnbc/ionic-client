import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from './guards/is-auth.guard';
import { IsNotAuthGuard } from './guards/is-not-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in-page/sign-in-page.module').then( m => m.SignInPageModule),
    canLoad: [IsNotAuthGuard]
    
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/inner-pages/inner-pages.module').then( m => m.InnerPagesPageModule),
    canLoad: [IsAuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
