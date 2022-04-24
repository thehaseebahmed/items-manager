import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConstants } from 'src/app/app.constants';
import { IItemsModel } from '../models/items.model';

import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let httpTestingController: HttpTestingController;
  let service: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsService],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(ItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all items', () => {
    const mockItems: IItemsModel = {
      items: [
        {
          title: 'iPhone 6S Oro',
          description:
            'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
          price: '740',
          email: 'iphonemail@wallapop.com',
          image:
            'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png',
        },
      ],
    };

    service.getAll().subscribe((data) => {
      expect(data.items.length).toEqual(1);
      expect(data.items[0].title).toEqual('iPhone 6S Oro');
    });

    const req = httpTestingController.expectOne(AppConstants.URL_ITEMS_GETALL);
    expect(req.request.method).toEqual('GET');
    req.flush(mockItems);
  });

  it('should get all items from cache', () => {
    const mockItems: IItemsModel = {
      items: [
        {
          title: 'iPhone 6S Oro',
          description:
            'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
          price: '740',
          email: 'iphonemail@wallapop.com',
          image:
            'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png',
        },
      ],
    };

    service.getAll().subscribe((data) => {});

    const req = httpTestingController.expectOne(AppConstants.URL_ITEMS_GETALL);
    expect(req.request.method).toEqual('GET');
    req.flush(mockItems);

    service.getAll().subscribe((data) => {
      expect(data.items.length).toEqual(1);
      expect(data.items[0].title).toEqual('iPhone 6S Oro');
    });
  });
});
