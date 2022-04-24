import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { SortTypeEnum } from 'src/app/shared/enums/sort-type.enum';
import { ItemActions } from '../actions/item.actions';
import { ItemsService } from '../services/items.service';
import { SearchQuery, SearchService } from '../services/search.service';
import { ItemsState } from './items.state';

describe('ItemsState', () => {
  let store: Store;
  let itemsSpy: jasmine.SpyObj<ItemsService>;
  let searchSpy: jasmine.SpyObj<SearchService>;

  beforeEach(() => {
    itemsSpy = jasmine.createSpyObj('ItemsService', ['getAll']);
    searchSpy = jasmine.createSpyObj('SearchService', ['search']);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ItemsState])],
      providers: [
        { provide: ItemsService, useValue: itemsSpy },
        { provide: SearchService, useValue: searchSpy },
      ],
    });

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
        results: [
          {
            title: 'Polaroid 635',
            description:
              'Cámara clásica de fotos Polaroid, modelo 635. Las fotos son a super color. Está en perfectas condiciones y es fantástica para coleccionistas. Se necesitan carretes instax 20 para hacer fotos. Tamaño M.',
            price: '50',
            email: 'cameramail@wallapop.com',
            image:
              'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/camera.png',
          },
          {
            title: 'Bolso piel marca Hoss',
            description:
              'Vendo bolso de piel marrón grande de la marca Hoss. Lo compré hace dos temporadas. Esta en perfectas condiciones, siempre se ha guardado en bolsa de tela para su conservación. Precio original de 400 euros. Lo vendo por 250 porque ya casi no me lo pongo. Tiene varios compartimentos dentro.',
            price: '250',
            email: 'bagmail@wallapop.com',
            image:
              'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/bag.png',
          },
        ],
      },
    });
  });

  it('should select favorites', () => {
    const favorites = store.selectSnapshot(ItemsState.favorites);
    expect(favorites.length).toBe(1);
    expect(favorites[0].title).toBe('iPhone 6S Oro');
  });

  it('should select favoriteTitles', () => {
    const titles = store.selectSnapshot(ItemsState.favoriteTitles);
    expect(titles.length).toBe(1);
    expect(titles[0]).toBe('iPhone 6S Oro');
  });

  it('should select results', () => {
    const results = store.selectSnapshot(ItemsState.results);
    expect(results!.length).toBeGreaterThan(0);
    expect(results![0].title).toBe('Polaroid 635');
  });

  it('should add to favorites', () => {
    const item = store.selectSnapshot(ItemsState.results)![0];
    store.dispatch(new ItemActions.AddToFavorites(item));

    const favorites = store.selectSnapshot(ItemsState.favorites);
    const addedFavorite = favorites.find((f) => f.title === item.title);
    expect(favorites.length).toBe(2);
    expect(addedFavorite).toBeTruthy();
  });

  it('should remove from favorites', () => {
    const item = store.selectSnapshot(ItemsState.favorites)[0];
    store.dispatch(new ItemActions.RemoveFromFavorites(item));

    const favorites = store.selectSnapshot(ItemsState.favorites);
    const removedFavorite = favorites.find((f) => f.title === item.title);
    expect(favorites.length).toBe(0);
    expect(removedFavorite).toBeFalsy();
  });

  it('should not remove from favorites an item not in favorites', () => {
    const item = store.selectSnapshot(ItemsState.results)![0];
    store.dispatch(new ItemActions.RemoveFromFavorites(item));

    const favorites = store.selectSnapshot(ItemsState.favorites);
    expect(favorites.length).toBe(1);
  });

  it('should search items', () => {
    itemsSpy.getAll.and.returnValue(
      of({
        items: [
          {
            title: 'TV de 43 pulgadas',
            description:
              'Televisor de 43 pulgadas. Funciona perfectamente. No tengo la base. Precio negociable',
            price: '400',
            email: 'tv@wallapop.com',
            image:
              'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/tv.png',
          },
          {
            title: 'Piso en Clot',
            description:
              '60m2, en pleno mercado del Clot. Piso muy acogedor, reformado. Ideal para parejas',
            price: '288000',
            email: 'flat@wallapop.com',
            image:
              'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/flat.png',
          },
        ],
      })
    );
    searchSpy.search.and.returnValue([
      {
        title: 'TV de 43 pulgadas',
        description:
          'Televisor de 43 pulgadas. Funciona perfectamente. No tengo la base. Precio negociable',
        price: '400',
        email: 'tv@wallapop.com',
        image:
          'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/tv.png',
      },
    ]);

    const query: SearchQuery = { title: 'TV' };
    store.dispatch(new ItemActions.SearchItems(query));

    const results = store.selectSnapshot(ItemsState.results);
    expect(results!.length).toBe(1);
    expect(results![0].title).toBe('TV de 43 pulgadas');
  });

  it('should sort searched items by title asc', () => {
    store.dispatch(new ItemActions.SortSearchItems('title', SortTypeEnum.asc));

    const item = store.selectSnapshot(ItemsState.results)?.[0];
    expect(item!.title).toBe('Bolso piel marca Hoss');
  });

  it('should sort searched items by title dsc', () => {
    store.dispatch(new ItemActions.SortSearchItems('title', SortTypeEnum.dsc));

    const item = store.selectSnapshot(ItemsState.results)![0];
    expect(item.title).toBe('Polaroid 635');
  });
});
