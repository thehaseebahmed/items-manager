import { IItemModel } from "./item.model";

export interface IItemsStateModel {
  favorites: IItemModel[];
  results?: IItemModel[];
}
