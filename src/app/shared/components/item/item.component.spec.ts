import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { ItemActions } from 'src/app/core/actions/item.actions';
import { ItemsState } from 'src/app/core/states/items.state';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let storeSpy: jasmine.SpyObj<Store>;

  let itemCta: any;
  let itemTitle: any;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    storeSpy.select.and.returnValue(of([]));

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    component.item = {
      title: 'iPhone 6S Oro',
      description:
        'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
      price: '740',
      email: 'iphonemail@wallapop.com',
      image:
        'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png',
    };

    fixture.detectChanges();
    itemCta = fixture.nativeElement.querySelector('div.item-cta');
    itemTitle = fixture.nativeElement.querySelector('span.item-title');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display item title', () => {
    expect(itemTitle.textContent).toContain(component.item.title);
  });

  it('should add item to favorite', () => {
    const action = new ItemActions.AddToFavorites(component.item);
    storeSpy.dispatch.withArgs(action).and.returnValue(of());

    component.onAddFavoritesBtnClick();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(action);
  });

  it('should remove item from favorite', () => {
    const action = new ItemActions.RemoveFromFavorites(component.item);
    storeSpy.dispatch.withArgs(action).and.returnValue(of());

    component.onRemoveFavoritesBtnClick();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(action);
  });
});
