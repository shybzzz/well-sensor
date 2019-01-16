import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMqttPage } from './new-mqtt.page';

describe('NewMqttPage', () => {
  let component: NewMqttPage;
  let fixture: ComponentFixture<NewMqttPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMqttPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMqttPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
