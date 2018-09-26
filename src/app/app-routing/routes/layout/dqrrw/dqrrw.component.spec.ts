/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DqrrwComponent } from './dqrrw.component';

describe('DqrrwComponent', () => {
  let component: DqrrwComponent;
  let fixture: ComponentFixture<DqrrwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DqrrwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqrrwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
