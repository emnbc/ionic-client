import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SignInPageRoutingModule } from './sign-in-page-routing.module';
import { SignInPage } from './sign-in-page.page';

@NgModule({
  imports: [
    SharedModule,
    SignInPageRoutingModule
  ],
  declarations: [SignInPage]
})
export class SignInPageModule {}
