import { LazyImgDirective } from './lazy-img.directive';

describe('LazyImgDirective', () => {
  it('should create an instance', () => {
    const nativeElement = document.createElement('img');
    const directive = new LazyImgDirective({ nativeElement });

    expect(directive).toBeTruthy();
  });
});
