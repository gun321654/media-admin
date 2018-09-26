/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { YwjrwComponent } from './ywjrw.component';

describe('YwjrwComponent', () => {
  let component: YwjrwComponent;
  let fixture: ComponentFixture<YwjrwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YwjrwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YwjrwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
