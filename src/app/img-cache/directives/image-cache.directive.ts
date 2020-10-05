import {Attribute, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {CacheService} from '../services/cache.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[imageCache]'
})
export class ImageCacheDirective {


  constructor(
    @Attribute('loader') public loader: string,
    @Attribute('onErrorSrc') public onErrorSrc: string,
    private renderer: Renderer2,
    private el: ElementRef,
    private cacheService: CacheService) {
    if (loader) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.loader);
    }
  }

  @Input('srcCache')
  set src(val) {
    if (val) {
      this.cacheService.fetchFromCache(val)
        .then(cached => {
          this.renderer.setAttribute(this.el.nativeElement, 'src', cached);
        });
    }
  }


  // @HostListener('load') onLoad() {
  //   // in case you want to listen to any set logs
  // }

  @HostListener('error') onError() {
    if (this.onErrorSrc) {
      this.loadError();
    }
  }

  private loadError() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.onErrorSrc);
  }
}
