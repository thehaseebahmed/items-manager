import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortTypeEnum } from '../../enums/sort-type.enum';

import { SortDropdownComponent } from './sort-dropdown.component';

describe('SortDropdownComponent', () => {
  let component: SortDropdownComponent;
  let fixture: ComponentFixture<SortDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortDropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortDropdownComponent);
    component = fixture.componentInstance;
    component.sortBy = [
      {
        displayText: 'Email',
        value: 'email',
      },
      {
        displayText: 'Title',
        value: 'title',
      },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort by only one key at a time', () => {
    fixture.detectChanges();

    component.onSortBy('email');
    component.onSortBy('title');

    let counter = 0;
    component.sortBy?.forEach((i) => (counter += i.type == undefined ? 0 : 1));

    expect(counter).toBe(1);
  });
});
