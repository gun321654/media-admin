/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RwrlComponent } from './rwrl.component';

describe('RwrlComponent', () => {
  let component: RwrlComponent;
  let fixture: ComponentFixture<RwrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
