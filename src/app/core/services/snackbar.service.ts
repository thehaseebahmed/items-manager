import { Injectable } from '@angular/core';
import * as Snackbar from 'node-snackbar';

@Injectable()
export class SnackbarService {
  private readonly configuration: SnackbarOptions = { pos: 'bottom-center' };

  constructor() {}

  public success(text: string) {
    Snackbar.show({
      ...this.configuration,
      text,
    });
  }

  public error(text: string) {
    Snackbar.show({
      ...this.configuration,
      text,
    });
  }
}
