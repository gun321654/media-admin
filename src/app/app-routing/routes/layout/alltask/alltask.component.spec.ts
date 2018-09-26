/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlltaskComponent } from './alltask.component';

describe('AlltaskComponent', () => {
  let component: AlltaskComponent;
  let fixture: ComponentFixture<AlltaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
