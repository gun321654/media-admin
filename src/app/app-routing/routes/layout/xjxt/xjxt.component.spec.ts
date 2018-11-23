/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { xjxtComponent } from './xjxt.component';

describe('XtlxComponent', () => {
  let component: xjxtComponent;
  let fixture: ComponentFixture<xjxtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ xjxtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(xjxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
