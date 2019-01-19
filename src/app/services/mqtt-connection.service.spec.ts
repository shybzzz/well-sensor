import { TestBed, inject } from '@angular/core/testing';

import { MqttConnectionService } from './mqtt-connection.service';

describe('MqttConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MqttConnectionService]
    });
  });

  it('should be created', inject([MqttConnectionService], (service: MqttConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
