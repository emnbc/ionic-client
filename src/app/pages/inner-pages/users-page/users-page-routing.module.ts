import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';

import { UsersPagePage } from './users-page.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPagePage
  },
  {
    path: ':id',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPagePageRoutingModule {}
