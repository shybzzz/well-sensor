import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDevicePage } from './new-device.page';

describe('NewDevicePage', () => {
  let component: NewDevicePage;
  let fixture: ComponentFixture<NewDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDevicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
