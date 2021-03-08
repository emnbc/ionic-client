import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { MainMenuComponent } from './main-menu.component';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [MainMenuComponent]
})
export class MainMenuModule { }
