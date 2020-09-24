import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ImgCacheModule} from './img-cache/img-cache.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ImgCacheModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
