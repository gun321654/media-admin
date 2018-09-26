/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { wdxtComponent } from './wdxt.component';

describe('XtlxComponent', () => {
  let component: wdxtComponent;
  let fixture: ComponentFixture<wdxtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ wdxtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(wdxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
