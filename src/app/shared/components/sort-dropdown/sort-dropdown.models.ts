import { SortTypeEnum } from '../../enums/sort-type.enum';

export interface IDropdownItem {
  displayText: string;
  type?: SortTypeEnum;
  value: string;
}

export interface ISortEvent {
  type: SortTypeEnum;
  value: string;
}
