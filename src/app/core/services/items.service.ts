import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { IItemsModel } from '../models/items.model';

@Injectable()
export class ItemsService {
  private getAllCache?: IItemsModel;

  constructor(private _http: HttpClient) {}

  public getAll(): Observable<IItemsModel> {
    if (this.getAllCache) {
      return of(this.getAllCache);
    }

    return this._http.get<IItemsModel>(AppConstants.URL_ITEMS_GETALL).pipe(
      tap((response) => {
        for (const item of response.items) {
          /*
           * Converting (price: string) to (price: int) but ideally this fix
           * should be done in the API response. An alternate approach to fixing
           * this could be doing this in the model using a getter, a setter and
           * a private property.
           */

          item.price =
            typeof item.price == 'string'
              ? parseInt(item.price as string)
              : item.price;
        }

        this.getAllCache = response;
      })
    );
  }
}
