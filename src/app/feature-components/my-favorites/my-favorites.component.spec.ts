import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { ItemsService } from 'src/app/core/services/items.service';
import { SearchService } from 'src/app/core/services/search.service';
import { ItemsState } from 'src/app/core/states/items.state';

import { MyFavoritesComponent } from './my-favorites.component';

describe('MyFavoritesComponent', () => {
  let component: MyFavoritesComponent;
  let fixture: ComponentFixture<MyFavoritesComponent>;
  let itemsSpy: jasmine.SpyObj<ItemsService>;
  let searchSpy: jasmine.SpyObj<SearchService>;
  let store: Store;

  beforeEach(async () => {
    itemsSpy = jasmine.createSpyObj('ItemsService', ['']);
    searchSpy = jasmine.createSpyObj('SearchService', ['isQueryEmpty', 'search']);

    await TestBed.configureTestingModule({
      declarations: [MyFavoritesComponent],
      imports: [NgxsModule.forRoot([ItemsState])],
      providers: [
        { provide: ItemsService, useValue: itemsSpy },
        { provide: SearchService, useValue: searchSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavoritesComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      items: {
        favorites: [
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
        results: [],
      },
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search favorites by title', () => {
    const query = { title: 'iPhone' };
    searchSpy.isQueryEmpty.and.returnValue(false);
    searchSpy.search.withArgs(component.favorites, query).and.returnValue([
      {
        title: 'iPhone 6S Oro',
        description:
          'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image:
          'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png',
      },
    ]);

    component.onSearch(query);

    expect(component.favorites[0].title).toBe('iPhone 6S Oro');
  });

  it('should return all favorites on empty search', () => {
    const query = { title: 'iPhone' };

    searchSpy.isQueryEmpty.and.returnValue(false);
    searchSpy.search.withArgs(component.favorites, query).and.returnValue([]);

    component.onSearch(query);
    expect(component.favorites.length).toBe(0);

    searchSpy.isQueryEmpty.and.returnValue(true);
    component.onSearch({});

    expect(component.favorites[0].title).toBe('iPhone 6S Oro');
  });
});
