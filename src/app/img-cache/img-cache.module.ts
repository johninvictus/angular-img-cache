import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CacheService} from './services/cache.service';
import {ImageCacheDirective} from './directives/image-cache.directive';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [ImageCacheDirective],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CacheService,
  ],
  exports: [
    ImageCacheDirective
  ]
})
export class ImgCacheModule {
}
