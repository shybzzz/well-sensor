import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingDevicePage } from './existing-device.page';

describe('ExistingDevicePage', () => {
  let component: ExistingDevicePage;
  let fixture: ComponentFixture<ExistingDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingDevicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
