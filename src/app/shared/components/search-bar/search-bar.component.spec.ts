import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppConstants } from 'src/app/app.constants';
import { click, enterText } from 'src/test';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have only one criteria in basic search', () => {
    expect(component.isAdvancedSearch).toBeFalse();
    expect(component.searchCriteria.length).toBe(1);
  });

  it('should have only one criteria in basic search when switched back from advanced search', () => {
    component.toggleAdvSearch();
    expect(component.isAdvancedSearch).toBeTrue();

    component.toggleAdvSearch();
    expect(component.isAdvancedSearch).toBeFalse();

    expect(component.searchCriteria.length).toBe(1);
  });

  it('should show add criterias message in advanced search', () => {
    component.toggleAdvSearch();
    expect(component.isAdvancedSearch).toBeTrue();
    expect(component.hasSearchCriteria).toBeFalse();

    fixture.detectChanges();

    const msg = fixture.nativeElement.querySelector('.adv-search-body > p');
    expect(msg?.textContent).toContain(
      'Click on the "+" icon to add a new search criteria.'
    );
  });

  it('should add additional criterias in advanced search', () => {
    component.toggleAdvSearch();
    expect(component.isAdvancedSearch).toBeTrue();
    expect(component.searchCriteria.length).toBe(0);

    component.onAddCriteriaIconClick();
    expect(component.searchCriteria.length).toBe(1);
  });

  it('should remove criterias in advanced search', () => {
    component.toggleAdvSearch();
    expect(component.isAdvancedSearch).toBeTrue();
    expect(component.searchCriteria.length).toBe(0);

    component.onAddCriteriaIconClick();
    component.onRemoveCriteriaIconClick(0);

    expect(component.searchCriteria.length).toBe(0);
  });

  it('should return search params on search', fakeAsync(() => {
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.search-bar-input > input'
    );
    const searchBtn = fixture.nativeElement.querySelector(
      '.search-bar-icon > button'
    );

    component.searchText.subscribe((query) => {
      expect(query['title']).toBe('iPhone');
    });

    enterText(fixture, input, 'iPhone', AppConstants.SEARCH_DEFAULT_DEBOUNCE + 10);
    fixture.detectChanges();
  }));
});
