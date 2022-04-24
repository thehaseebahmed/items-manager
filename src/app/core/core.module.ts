import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from './services/items.service';
import { SearchService } from './services/search.service';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ItemsService,
    SearchService,
    SnackbarService
  ]
})
export class AppCoreModule {}
