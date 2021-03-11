import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { UsersPagePageRoutingModule } from './users-page-routing.module';
import { UsersPagePage } from './users-page.page';
import { HeaderModule } from '../../../components/header/header.module';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    SharedModule,
    UsersPagePageRoutingModule,
    HeaderModule
  ],
  declarations: [UsersPagePage, UserComponent]
})
export class UsersPagePageModule {}
