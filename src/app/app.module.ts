import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    HTTP,
    AppMinimize
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
