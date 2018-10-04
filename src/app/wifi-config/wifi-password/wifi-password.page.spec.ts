import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiPasswordPage } from './wifi-password.page';

describe('WifiPasswordPage', () => {
  let component: WifiPasswordPage;
  let fixture: ComponentFixture<WifiPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiPasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
