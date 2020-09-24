import {Attribute, Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {CacheService} from '../services/cache.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[imageCache]'
})
export class ImageCacheDirective {


  constructor(
    @Attribute('srcCache') public srcCache: string,
    @Attribute('loader') public loader: string,
    @Attribute('onErrorSrc') public onErrorSrc: string,
    private renderer: Renderer2,
    private el: ElementRef,
    private cacheService: CacheService) {
    if (loader) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.loader);
    }
    if (srcCache) {
      this.checkIfCacheElseAdd(srcCache);
    }
  }


  @HostListener('load') onLoad() {
    // in case you want to listen to any set logs
  }

  @HostListener('error') onError() {
    if (this.onErrorSrc) {
      this.loadError();
    }
  }

  private checkIfCacheElseAdd(url): void {
    const imageCache = this.cacheService.get(url);

    if (imageCache) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', imageCache);
    } else {
      this.cacheService.getUrl(url).subscribe(imgData => {
        this.renderer.setAttribute(this.el.nativeElement, 'src', imgData);
        this.cacheService.put(url, imgData);
      }, error => {
        console.error(error);
        this.loadError();
      });
    }
  }

  private loadError() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.onErrorSrc);
  }

}
