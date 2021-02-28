import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPagePage } from './about-page.page';

const routes: Routes = [
  {
    path: '',
    component: AboutPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPagePageRoutingModule {}
