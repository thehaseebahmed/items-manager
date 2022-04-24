import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './components/item/item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import { SortDropdownComponent } from './components/sort-dropdown/sort-dropdown.component';
import { LazyImgDirective } from './directives/lazy-img.directive';

@NgModule({
  declarations: [
    ItemComponent,
    ModalComponent,
    SearchBarComponent,
    SortDropdownComponent,
    LazyImgDirective,
  ],
  exports: [
    ItemComponent,
    LazyImgDirective,
    ModalComponent,
    SearchBarComponent,
    SortDropdownComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class AppSharedModule {}
