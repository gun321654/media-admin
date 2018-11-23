/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { zprwComponent } from './zprw.component';

describe('XtlxComponent', () => {
  let component: zprwComponent;
  let fixture: ComponentFixture<zprwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zprwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zprwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
