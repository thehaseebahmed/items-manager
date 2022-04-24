import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { ItemActions } from 'src/app/core/actions/item.actions';
import { IItemModel } from 'src/app/core/models/item.model';
import { SearchQuery } from 'src/app/core/services/search.service';
import { ItemsState } from 'src/app/core/states/items.state';
import {
  IDropdownItem,
  ISortEvent,
} from 'src/app/shared/components/sort-dropdown/sort-dropdown.models';
import { SortTypeEnum } from 'src/app/shared/enums/sort-type.enum';

@Component({
  selector: 'wp-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.less'],
})
export class SearchHomeComponent implements OnInit {
  @ViewChild('dropdown') dropdown?: ElementRef;

  public loadedItems: number = AppConstants.SEARCH_DEFAULT_LOADED_ITEMS;
  public readonly results$!: Observable<IItemModel[] | undefined>;
  public readonly sortBy: IDropdownItem[] = [
    { value: 'description', displayText: 'Description' },
    { value: 'email', displayText: 'Email' },
    { value: 'price', displayText: 'Price' },
    { value: 'title', displayText: 'Title' },
  ];
  public readonly sortType = SortTypeEnum;

  private readonly pageSize: number = 5;

  constructor(private _store: Store) {
    this.results$ = this._store.select(ItemsState.results);
  }

  ngOnInit(): void {
    this._store.dispatch(new ItemActions.SearchItems());
  }

  public onLoadMoreBtnClick() {
    this.loadedItems += this.pageSize;
  }

  public onSearch(query: SearchQuery) {
    this.resetSearch();
    this._store.dispatch(new ItemActions.SearchItems(query));
  }

  public onSortBy($event: ISortEvent) {
    this._store.dispatch(
      new ItemActions.SortSearchItems(
        $event.value as keyof IItemModel,
        $event.type
      )
    );
  }

  private resetSearch() {
    this.loadedItems = AppConstants.SEARCH_DEFAULT_LOADED_ITEMS;
    for (const sort of this.sortBy) {
      sort.type = undefined;
    }
  }
}
