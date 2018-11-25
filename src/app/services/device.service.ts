import { StorageDevice } from '../model/storage-device';
import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { DeviceStorageService } from './device-storage.service';

const mockDevice: StorageDevice = {
  id: 'Test',
  ssid: '',
  ipAddress: '',
  mqttOptions: {
    username: 'afpodcuo',
    password: 'UwxwRLCN-sIX',
    servers: [{ host: 'm15.cloudmqtt.com', port: 39557 /*19557 29557 39557*/ }]
  }
};
const mockDevices: StorageDevice[] = [mockDevice];

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  devices$ = new ReplaySubject<StorageDevice[]>(1);
  currentDevice$ = new BehaviorSubject<StorageDevice>(mockDevice);

  constructor(private deviceStorage: DeviceStorageService) {}

  async resetDevices(): Promise<StorageDevice[]> {
    try {
      const devices = (await this.deviceStorage.getDevices()) || mockDevices;
      this.devices$.next(devices);
      return Promise.resolve(devices);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async setCurrentDevice(deviceId: string): Promise<StorageDevice> {
    try {
      const device = await this.deviceStorage.getDevice(deviceId);
      this.currentDevice$.next(device);
      return Promise.resolve(device);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async removeDevice(device: StorageDevice): Promise<void> {
    try {
      await this.deviceStorage.removeDevice(device);
      await this.resetDevices();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
