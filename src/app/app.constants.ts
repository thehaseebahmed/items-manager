import { environment } from 'src/environments/environment';

export abstract class AppConstants {
  public static readonly CSS_PLACEHOLDER_CLASS: string = `img-placeholder`;
  public static readonly ERROR_SORTING_TYPE_MISMATCH: string = `Unable to sort values of two different types.`;
  public static readonly SEARCH_DEFAULT_LOADED_ITEMS: number = 5;
  public static readonly SEARCH_DEFAULT_DEBOUNCE: number = 200;
  public static readonly URL_ITEMS_GETALL: string = `${environment.baseUrl}/items.json`;
}
