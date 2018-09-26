/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { dsxtComponent } from './dsxt.component';

describe('dsxtComponent', () => {
  let component: dsxtComponent;
  let fixture: ComponentFixture<dsxtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [dsxtComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dsxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
