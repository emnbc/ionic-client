import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { InnerPagesPageRoutingModule } from './inner-pages-routing.module';
import { InnerPagesPage } from './inner-pages.page';

@NgModule({
  imports: [
    SharedModule,
    InnerPagesPageRoutingModule
  ],
  declarations: [InnerPagesPage]
})
export class InnerPagesPageModule {}
