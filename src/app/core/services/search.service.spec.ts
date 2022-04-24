import { TestBed } from '@angular/core/testing';
import { AppCoreModule } from '../core.module';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppCoreModule] });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should say query is empty for empty object', () => {
    const query = {};
    const isEmpty = service.isQueryEmpty(query);

    expect(isEmpty).toBeTrue();
  });

  it('should say query is empty for empty key value', () => {
    const query = { title: '' };
    const isEmpty = service.isQueryEmpty(query);

    expect(isEmpty).toBeTrue();
  });

  it('should say query is not empty', () => {
    const query = { title: 'iPhone 6S' };
    const isEmpty = service.isQueryEmpty(query);

    expect(isEmpty).toBeFalse();
  });
});
