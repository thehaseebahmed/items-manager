import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortTypeEnum } from '../../enums/sort-type.enum';
import { IDropdownItem, ISortEvent } from './sort-dropdown.models';

@Component({
  selector: 'wp-sort-dropdown',
  templateUrl: './sort-dropdown.component.html',
  styleUrls: ['./sort-dropdown.component.less'],
})
export class SortDropdownComponent implements OnInit {
  @Input() sortBy?: IDropdownItem[];
  @Output() onSort: EventEmitter<ISortEvent> = new EventEmitter<ISortEvent>();

  public isOpen: boolean = false;
  public readonly sortType = SortTypeEnum;

  constructor() {}

  ngOnInit(): void {}

  onSortBy(value: string) {
    if (!this.sortBy) {
      return;
    }

    for (const i of this.sortBy) {
      if (i.value == value) {
        i.type =
          i.type == SortTypeEnum.asc ? SortTypeEnum.dsc : SortTypeEnum.asc;

        this.onSort.emit({ type: i.type, value: i.value });
      } else {
        i.type = undefined;
      }
    }

    this.isOpen = false;
  }
}
