import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { patch, removeItem } from '@ngxs/store/operators';
import { tap } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { SortTypeEnum } from 'src/app/shared/enums/sort-type.enum';
import { ItemActions } from '../actions/item.actions';
import { IItemModel } from '../models/item.model';
import { IItemsStateModel } from '../models/items-state.model';
import { ItemsService } from '../services/items.service';
import { SearchService } from '../services/search.service';

const ITEMS_STATE_TOKEN = new StateToken<IItemsStateModel>('items');

@State({
  name: ITEMS_STATE_TOKEN,
  defaults: {
    favorites: [],
    results: undefined,
  },
})
@Injectable()
export class ItemsState {
  @Selector()
  static favorites(state: IItemsStateModel) {
    return state.favorites;
  }

  @Selector()
  static favoriteTitles(state: IItemsStateModel) {
    return state.favorites.map((i) => i.title);
  }

  @Selector()
  static results(state: IItemsStateModel) {
    return state.results;
  }

  constructor(
    private _itemsSvc: ItemsService,
    private _searchSvc: SearchService
  ) {}

  @Action(ItemActions.AddToFavorites)
  addToFavorites(
    ctx: StateContext<IItemsStateModel>,
    action: ItemActions.AddToFavorites
  ) {
    const state = ctx.getState();
    const itemAlreadyFavorited = state.favorites.find(
      (item) => item.title == action.item.title
    );

    if (!itemAlreadyFavorited) {
      ctx.setState(
        patch({
          favorites: [...state.favorites, action.item],
        })
      );
    }
  }

  @Action(ItemActions.RemoveFromFavorites)
  removeFromFavorites(
    ctx: StateContext<IItemsStateModel>,
    action: ItemActions.RemoveFromFavorites
  ) {
    const state = ctx.getState();
    const itemAlreadyFavorited = state.favorites.find(
      (item) => item.title == action.item.title
    );

    if (itemAlreadyFavorited) {
      ctx.setState(
        patch({
          favorites: removeItem<IItemModel>(
            (item) => item?.title === action.item.title
          ),
        })
      );
    }
  }

  @Action(ItemActions.SearchItems)
  searchItems(
    ctx: StateContext<IItemsStateModel>,
    action: ItemActions.SearchItems
  ) {
    return this._itemsSvc.getAll().pipe(
      tap((data) => {
        const results = this._searchSvc.search(data.items, action?.query);

        ctx.setState(
          patch({
            results,
          })
        );
      })
    );
  }

  @Action(ItemActions.SortSearchItems)
  sortSearchItems(
    ctx: StateContext<IItemsStateModel>,
    action: ItemActions.SortSearchItems
  ) {
    const state = ctx.getState();
    const resultsClone = state.results ? [...state.results] : [];
    const sortedResults = resultsClone.sort((a, b) => {
      const aValue = a[action.value];
      const bValue = b[action.value];

      if (typeof aValue == 'string' && typeof bValue == 'string') {
        return action.type == SortTypeEnum.asc
          ? (a[action.value] as string).localeCompare(b[action.value] as string)
          : (b[action.value] as string).localeCompare(
              a[action.value] as string
            );
      } else if (typeof aValue == 'number' && typeof bValue == 'number') {
        return action.type == SortTypeEnum.asc
          ? (a[action.value] as number) - (b[action.value] as number)
          : (b[action.value] as number) - (a[action.value] as number);
      } else if (typeof aValue !== typeof bValue) {
        throw Error(AppConstants.ERROR_SORTING_TYPE_MISMATCH);
      }

      return 0;
    });

    ctx.setState(
      patch({
        results: sortedResults,
      })
    );
  }
}
