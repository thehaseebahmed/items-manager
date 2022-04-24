// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { ComponentFixture, getTestBed, tick } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 },
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(
  el: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

export function enterText<T>(
  fixture: ComponentFixture<T>,
  el: HTMLInputElement,
  text: string,
  wait: number = 0
): void {
  if (!(el instanceof HTMLInputElement)) {
    throw new Error('Provided element does not support text input.');
  }

  fixture.detectChanges();
  tick();

  el.value = text;
  el.dispatchEvent(new Event('input'));
  tick(wait);
}
