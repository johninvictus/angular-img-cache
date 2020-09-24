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
    if (srcCache) {
      this.checkIfCacheElseAdd(srcCache);
    }
  }


  @HostListener('load') onLoad() {
    const imageData = this.el.nativeElement.src;
    console.error(imageData);
    // this.renderer.setAttribute(this.el.nativeElement, 'src', imageData);
  }

  @HostListener('error') onError() {
    // this.renderer.setAttribute(this.el.nativeElement, 'src', this.onErrorSrc);
  }

  private checkIfCacheElseAdd(url): void {
    const imageCache = this.cacheService.get(url);

    if (imageCache) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', imageCache);
    } else {
      this.cacheService.getUrl(url).subscribe(imgData => {
        this.renderer.setAttribute(this.el.nativeElement, 'src', imgData);
        this.cacheService.put(url, imgData);
      });
    }
  }

}
