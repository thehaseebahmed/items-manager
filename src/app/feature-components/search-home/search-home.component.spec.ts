import { query } from '@angular/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { AppCoreModule } from 'src/app/core/core.module';
import { IItemModel } from 'src/app/core/models/item.model';
import { ItemsService } from 'src/app/core/services/items.service';
import { SearchService } from 'src/app/core/services/search.service';
import { ItemsState } from 'src/app/core/states/items.state';
import { SortTypeEnum } from 'src/app/shared/enums/sort-type.enum';
import { AppSharedModule } from 'src/app/shared/shared.module';
import { click } from 'src/test';

import { SearchHomeComponent } from './search-home.component';

describe('SearchHomeComponent', () => {
  let component: SearchHomeComponent;
  let fixture: ComponentFixture<SearchHomeComponent>;
  let itemsSpy: jasmine.SpyObj<ItemsService>;
  let searchSpy: jasmine.SpyObj<SearchService>;
  let store: Store;

  beforeEach(async () => {
    itemsSpy = jasmine.createSpyObj('ItemsService', ['getAll']);
    searchSpy = jasmine.createSpyObj('SearchService', [
      'isQueryEmpty',
      'search',
    ]);

    await TestBed.configureTestingModule({
      declarations: [SearchHomeComponent],
      imports: [AppCoreModule, NgxsModule.forRoot([ItemsState])],
      providers: [
        { provide: ItemsService, useValue: itemsSpy },
        { provide: SearchService, useValue: searchSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHomeComponent);
    component = fixture.componentInstance;

    const data = {
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
        {
          title: 'Reloj de Daniel Wellington',
          description:
            'Reloj de la marca Daniel Wellington usado sólo un mes. Ahora me han regalado otro que me gusta más y es muy parecido; por eso lo vendo. Su precio en tienda son 149 pero lo vendo por 100 euros. Es con la esfera blanca y la correa de piel marron. ',
          price: '100',
          email: 'watchmail@wallapop.com',
          image:
            'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/watch.png',
        },
        {
          title: 'Coche antiguo americano',
          description:
            'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
          price: '210000',
          email: 'carmail@wallapop.com',
          image:
            'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png',
        },
        {
          title: 'Barbacoa',
          description:
            'Barbacoa en buen estado. La he usado pocas veces y está casi nueva. Ideal para fiestas y celebraciones',
          price: '120',
          email: 'barbecue@wallapop.com',
          image:
            'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/barbecue.png',
        },
        {
          title: 'Sofa de piel auténtica',
          description:
            'Vendo sofá de piel negro. Tiene signos evidentes de uso, de ahí el precio. Es muy cómodo y bonito',
          price: '75',
          email: 'sofa@wallapop.com',
          image:
            'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/sofa.png',
        },
        {
          title: 'Vespa restaurada',
          description:
            'Está restaurada y muy cuidada, con piezas originales y repintada una vez de color rojo carmín. Solo acepto ofertas serias',
          price: '1990',
          email: 'vespa@wallapop.com',
          image:
            'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/vespa.png',
        },
        {
          title: 'Batidora',
          description:
            'Está completamente nueva (no la he sacado de la caja). Me la regalaron pero no la quiero',
          price: '90',
          email: 'mixer@wallapop.com',
          image:
            'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/mixer.png',
        },
        {
          title: 'Mudanzas',
          description:
            'Está completamente nueva (no la he sacado de la caja). Me la regalaron pero no la quiero',
          price: '90',
          email: 'moves@wallapop.com',
          image:
            'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/moves.png',
        },
      ],
    };

    itemsSpy.getAll.and.returnValue(of(data));
    searchSpy.search.and.returnValue(data.items);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load only 5 results at load', () => {
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelectorAll('.list ul li');
    expect(list.length).toBe(5);
  });

  it('should load 5 more results on load more', () => {
    fixture.detectChanges();

    const loadMoreBtn =
      fixture.nativeElement.querySelector('.list-cta > button');

    click(loadMoreBtn);
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelectorAll('.list ul li');
    expect(list.length).toBe(10);
  });

  it('should sort by title asc', () => {
    fixture.detectChanges();

    component.onSortBy({ type: SortTypeEnum.asc, value: 'title' });

    component.results$.subscribe((items) => {
      expect(items![0].title).toBe('Barbacoa');
    });
  });

  it('should sort by title dsc', () => {
    fixture.detectChanges();

    component.onSortBy({ type: SortTypeEnum.dsc, value: 'title' });

    component.results$.subscribe((items) => {
      expect(items![0].title).toBe('Vespa restaurada');
    });
  });

  it('should reset sort on new search', () => {
    fixture.detectChanges();

    component.onSortBy({ type: SortTypeEnum.dsc, value: 'title' });
    component.onSearch({ title: 'iPhone 6S Oro' });

    expect(component.sortBy.every((i) => !i.type)).toBeTrue();
  });
});
