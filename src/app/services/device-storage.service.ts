import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageDevice } from '../model/storage-device';
import { deviceList } from '../helpers/device-storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceStorageService {
  log$ = new Subject();
  err$ = new Subject();

  constructor(private storage: Storage) {}

  async addDevice(device: StorageDevice): Promise<StorageDevice> {
    this.log$.next('Saving started');
    try {
      const storage = this.storage;
      await storage.ready();
      this.log$.next('Storage is ready');
      let devices = (await this.getDevices()) || [];
      this.log$.next(`Found ${devices.length} devices`);
      const deviceIndex = devices
        ? devices.findIndex(d => d && d.id === device.id)
        : -1;
      if (deviceIndex === -1) {
        devices = [device, ...devices];
      } else {
        const d = devices[deviceIndex];
        devices[deviceIndex] = { ...d, ...device };
      }
      this.log$.next(deviceIndex);
      await storage.set(deviceList, devices);
      this.log$.next('Saved');
      return Promise.resolve(device);
    } catch (er) {
      return Promise.reject(er);
    }
  }

  async getDevices(): Promise<StorageDevice[]> {
    return this.storage.get(deviceList);
  }

  async removeDevice(device: StorageDevice): Promise<void> {
    try {
      const storage = this.storage;
      await storage.ready();
      const devices = await this.getDevices();
      const deviceId = device.id;
      const removeIndex = devices
        ? devices.findIndex(d => d.id === deviceId)
        : -1;
      if (removeIndex > -1) {
        devices.splice(removeIndex, 1);
        return storage.set(deviceList, devices);
      } else {
        return Promise.reject(`Device ${deviceId} does not exist`);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getDevice(id: string): Promise<StorageDevice> {
    try {
      const storage = this.storage;
      await storage.ready();

      const devices = await this.getDevices();
      return Promise.resolve(devices.find(d => d && d.id === id));
    } catch (err) {
      Promise.reject(err);
    }
  }
}
