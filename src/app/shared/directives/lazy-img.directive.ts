import { Directive, ElementRef, Input } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';

@Directive({
  selector: '[wpLazyImg]',
})
export class LazyImgDirective {
  @Input() public wpLazyImg: string = '';

  constructor({ nativeElement }: ElementRef<HTMLElement>) {
    const isImg: boolean = nativeElement.tagName == 'img';
    const supportsLoading: boolean = 'loading' in HTMLImageElement.prototype;
    const supportsIntersectionObserver: boolean =
      'IntersectionObserver' in window;

    if (isImg && supportsLoading) {
      nativeElement.setAttribute('loading', 'lazy');
    } else if (supportsIntersectionObserver) {
      const observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.onIntersecting(entry, this.wpLazyImg);
            observer.unobserve(entry.target);
          }
        }
      });

      observer?.observe(nativeElement);
    }
  }

  private onIntersecting(entry: IntersectionObserverEntry, imageUrl: string) {
    const element = entry.target as HTMLElement;
    element.style.backgroundImage = 'url(' + imageUrl + ')';

    if (element.className.indexOf(AppConstants.CSS_PLACEHOLDER_CLASS) > 0) {
      element.className = element.className.replace(AppConstants.CSS_PLACEHOLDER_CLASS, '');
    }
  }
}
