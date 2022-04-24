import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ItemActions } from 'src/app/core/actions/item.actions';
import { IItemModel } from 'src/app/core/models/item.model';
import { ItemsState } from 'src/app/core/states/items.state';

@Component({
  selector: 'wp-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less'],
})
export class ItemComponent implements OnInit, OnDestroy {
  @Input() public compactMode: boolean = false;
  @Input() public item!: IItemModel;

  public isFavorite: boolean = false;

  private readonly _destroy$: Subject<boolean> = new Subject();

  constructor(private _store: Store) {}

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  ngOnInit(): void {
    this._store
      .select(ItemsState.favoriteTitles)
      .pipe(takeUntil(this._destroy$))
      .subscribe((titles) => {
        this.isFavorite = titles.indexOf(this.item?.title) > -1;
      });
  }

  public onAddFavoritesBtnClick() {
    this._store.dispatch(new ItemActions.AddToFavorites(this.item));
  }

  public onRemoveFavoritesBtnClick() {
    this._store.dispatch(new ItemActions.RemoveFromFavorites(this.item));
  }
}
