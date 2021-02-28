import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { AboutPagePageRoutingModule } from './about-page-routing.module';
import { AboutPagePage } from './about-page.page';
import { HeaderModule } from '../../../components/header/header.module';

@NgModule({
  imports: [
    SharedModule,
    AboutPagePageRoutingModule,
    HeaderModule
  ],
  declarations: [AboutPagePage]
})
export class AboutPagePageModule {}
