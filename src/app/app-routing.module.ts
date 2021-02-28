import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in-page/sign-in-page.module').then( m => m.SignInPageModule),
    
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/inner-pages/inner-pages.module').then( m => m.InnerPagesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
