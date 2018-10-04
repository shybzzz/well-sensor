import { TestBed, inject } from '@angular/core/testing';

import { WifiConfigService } from './wifi-config.service';

describe('WifiConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WifiConfigService]
    });
  });

  it('should be created', inject([WifiConfigService], (service: WifiConfigService) => {
    expect(service).toBeTruthy();
  }));
});
