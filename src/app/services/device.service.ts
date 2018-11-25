import { StorageDevice } from '../model/storage-device';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DeviceStorageService } from './device-storage.service';

export const mockDevice = { id: 'Test', ssid: '', ipAddress: '', mqttOptions: {} };
const mockDevices: StorageDevice[] = [mockDevice];

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  devices$ = new ReplaySubject<StorageDevice[]>(1);
  currentDevice$ = new ReplaySubject<StorageDevice>(1);

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
