import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'wp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
})
export class ModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  closeModal($event?: any, force: boolean = false): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }
}
