import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { HomePagePageRoutingModule } from './home-page-routing.module';
import { HomePagePage } from './home-page.page';
import { HeaderModule } from '../../../components/header/header.module';

@NgModule({
  imports: [
    SharedModule,
    HomePagePageRoutingModule,
    HeaderModule
  ],
  declarations: [HomePagePage]
})
export class HomePagePageModule {}
