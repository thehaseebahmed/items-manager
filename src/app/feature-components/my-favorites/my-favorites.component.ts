import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { IItemModel } from 'src/app/core/models/item.model';
import {
  SearchQuery,
  SearchService,
} from 'src/app/core/services/search.service';
import { ItemsState } from 'src/app/core/states/items.state';

@Component({
  selector: 'wp-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.less'],
})
export class MyFavoritesComponent implements OnInit, OnDestroy {
  public readonly enabledAdvanceSearchInModal: boolean = false;
  public favorites: IItemModel[] = [];
  public hasFavorites: boolean = false;

  private readonly _destroy$: Subject<boolean> = new Subject();
  private _lastQuery: SearchQuery = {};

  constructor(private _searchSvc: SearchService, private _store: Store) {}

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  ngOnInit(): void {
    this._store
      .select(ItemsState.favorites)
      .pipe(
        tap((items) => (this.hasFavorites = items?.length > 0)),
        takeUntil(this._destroy$)
      )
      .subscribe(() => this.onSearch(this._lastQuery));
  }

  public onSearch(query: SearchQuery) {
    if (this._searchSvc.isQueryEmpty(query)) {
      this.favorites = this._store.selectSnapshot(ItemsState.favorites);
      this._lastQuery = query;
      return;
    }

    this.favorites = this._searchSvc.search(this.favorites, query);
    this._lastQuery = query;
  }
}
