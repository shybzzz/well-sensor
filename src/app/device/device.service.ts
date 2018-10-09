import { Device } from './../model/device';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DeviceStorageService } from '../services/device-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  deviceId$ = new ReplaySubject<string>(1);
  devices$ = new ReplaySubject<Device[]>(1);
  currentDevice$ = new ReplaySubject<Device>(1);

  constructor(private deviceStorage: DeviceStorageService) {}

  async resetDevices(): Promise<Device[]> {
    try {
      const devices = await this.deviceStorage.getDevices();
      this.devices$.next(devices);
      return Promise.resolve(devices);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async setCurrentDevice(deviceId: string): Promise<Device> {
    try {
      const device = await this.deviceStorage.getDevice(deviceId);
      this.currentDevice$.next(device);
      return Promise.resolve(device);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async removeDevice(deviceId: string): Promise<void> {
    try {
      await this.deviceStorage.removeDevice(deviceId);
      await this.resetDevices();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
