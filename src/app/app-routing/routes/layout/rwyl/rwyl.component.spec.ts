/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RwylComponent } from './rwyl.component';

describe('RwylComponent', () => {
  let component: RwylComponent;
  let fixture: ComponentFixture<RwylComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwylComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwylComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
