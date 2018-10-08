import { TestBed, inject } from '@angular/core/testing';

import { DeviceStorageService } from './device-storage.service';

describe('DeviceStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceStorageService]
    });
  });

  it('should be created', inject([DeviceStorageService], (service: DeviceStorageService) => {
    expect(service).toBeTruthy();
  }));
});
