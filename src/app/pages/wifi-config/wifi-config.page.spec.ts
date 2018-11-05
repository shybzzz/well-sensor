import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiConfigPage } from './wifi-config.page';

describe('WifiConfigPage', () => {
  let component: WifiConfigPage;
  let fixture: ComponentFixture<WifiConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiConfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
