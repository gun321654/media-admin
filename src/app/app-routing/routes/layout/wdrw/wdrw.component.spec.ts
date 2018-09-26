/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WdrwComponent } from './wdrw.component';

describe('WdrwComponent', () => {
  let component: WdrwComponent;
  let fixture: ComponentFixture<WdrwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WdrwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WdrwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
