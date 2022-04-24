import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
} from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { ISearchModel } from 'src/app/core/models/search.model';
import { SearchQuery } from 'src/app/core/services/search.service';

@Component({
  selector: 'wp-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() public enableAdvancedSearch: boolean = true;
  @Output() public searchText: EventEmitter<SearchQuery> =
    new EventEmitter<SearchQuery>();

  @ViewChild('input') public input?: ElementRef;

  public readonly criteriaKeys = [
    { value: 'description', displayText: 'Description' },
    { value: 'email', displayText: 'Email' },
    { value: 'price', displayText: 'Price' },
    { value: 'title', displayText: 'Title' },
  ];
  public isAdvancedSearch: boolean = false;
  public searchCriteria: ISearchModel[] = [];

  public get hasSearchCriteria(): boolean {
    return this.searchCriteria.length > 0;
  }

  private readonly _autoSearch: Subject<string | undefined | null> = new Subject<string | undefined | null>();
  private readonly _destroy$: Subject<boolean> = new Subject();
  private readonly _simpleSearchCriteria = [{ key: 'title', value: '' }];

  constructor() {
    this.searchCriteria = this._simpleSearchCriteria;
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  ngOnInit(): void {
    this._autoSearch
      .pipe(
        debounceTime(AppConstants.SEARCH_DEFAULT_DEBOUNCE),
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe(() => this.onSearchBtnClick());
  }

  public onAddCriteriaIconClick() {
    this.searchCriteria.push({} as ISearchModel);
  }

  public onRemoveCriteriaIconClick(index: number) {
    this.searchCriteria.splice(index, 1);
  }

  public onSearchInput($event: Event) {
    const event = $event as InputEvent;
    this._autoSearch.next(event.data);
  }

  public onSearchBtnClick() {
    const query: SearchQuery = {};
    this.searchCriteria.forEach((c) => (query[c.key] = c.value));

    this.searchText.emit(query);
  }

  public toggleAdvSearch() {
    // NOTE: Conditions over here are reversed because the variable is yet to be toggled.
    if (this.isAdvancedSearch) {
      this.searchCriteria = this._simpleSearchCriteria;
    } else {
      this.searchCriteria = [];
    }

    this.isAdvancedSearch = !this.isAdvancedSearch;
  }
}
