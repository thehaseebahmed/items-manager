import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  public modalOpened: boolean = false;

  private readonly _destroy$: Subject<boolean> = new Subject();

  constructor() {}

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  ngOnInit(): void {}

  public onFavoritesBtnClick() {
    this.modalOpened = true;
  }
}
