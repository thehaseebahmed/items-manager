import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';

@Injectable()
export class SearchService {
  constructor() {}

  public isQueryEmpty(query: SearchQuery): boolean {
    if (query == null || query == undefined) {
      return true;
    }

    return Object.keys(query).every(
      (key) => query[key] == null || query[key] == undefined || query[key] == ''
    );
  }

  public search<T>(data: T[], query?: SearchQuery): T[] {
    if (!query || this.isQueryEmpty(query)) {
      return data;
    }

    const keys = Object.keys(query);
    const fuseQuery: Fuse.Expression[] = [];
    keys.forEach((k) => fuseQuery.push({ [k]: query[k] }));

    const fuse = new Fuse(data, { keys, includeScore: true });
    const results = fuse.search({ $and: fuseQuery });
    return results.map((r) => r.item);
  }
}

export type SearchQuery = { [key: string]: any };
