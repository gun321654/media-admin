/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WcjdComponent } from './wcjd.component';

describe('WcjdComponent', () => {
  let component: WcjdComponent;
  let fixture: ComponentFixture<WcjdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcjdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcjdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
