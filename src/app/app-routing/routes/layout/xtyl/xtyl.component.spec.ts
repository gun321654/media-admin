/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { xtylComponent } from './xtyl.component';

describe('XtlxComponent', () => {
  let component: xtylComponent;
  let fixture: ComponentFixture<xtylComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ xtylComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(xtylComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
