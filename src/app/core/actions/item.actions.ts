import { SortTypeEnum } from "src/app/shared/enums/sort-type.enum";
import { IItemModel } from "../models/item.model";
import { SearchQuery } from "../services/search.service";

export namespace ItemActions {
  export class AddToFavorites {
    static readonly type = '[WP] AddToFavorites';
    constructor(public item: IItemModel) {}
  }

  export class RemoveFromFavorites {
    static readonly type = '[WP] RemoveFromFavorites';
    constructor(public item: IItemModel) {}
  }

  export class SearchItems {
    static readonly type = '[WP] SearchItems';
    constructor(public query?: SearchQuery) {}
  }

  export class SortSearchItems {
    static readonly type = '[WP] SortSearchItems';
    constructor(public value: keyof IItemModel, public type: SortTypeEnum) {}
  }
}
