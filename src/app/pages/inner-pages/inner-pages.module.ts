import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { InnerPagesPageRoutingModule } from './inner-pages-routing.module';
import { MainMenuModule } from '../../components/main-menu/main-menu.module';
import { InnerPagesPage } from './inner-pages.page';

@NgModule({
  imports: [
    SharedModule,
    InnerPagesPageRoutingModule,
    MainMenuModule
  ],
  declarations: [InnerPagesPage]
})
export class InnerPagesPageModule {}
