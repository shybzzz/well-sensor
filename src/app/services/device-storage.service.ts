import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Device } from '../model/device';
import { generateId, deviceList } from '../helpers/device-storage';

@Injectable({
  providedIn: 'root'
})
export class DeviceStorageService {
  constructor(private storage: Storage) {}

  async addDevice(ssid: string, ipAddress: string): Promise<Device> {
    try {
      const id = generateId();
      const device = { ssid, ipAddress, id };
      const storage = this.storage;
      await storage.set(deviceList, [
        device,
        ...((await this.getDevices()) || [])
      ]);

      return Promise.resolve(device);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getDevices(): Promise<Device[]> {
    return this.storage.get(deviceList);
  }

  async removeDevice(id: string): Promise<void> {
    try {
      const devices = await this.getDevices();
      const removeIndex = devices.findIndex(device => device.id === id);
      if (removeIndex > -1) {
        devices.splice(removeIndex, 1);
        return this.storage.set(deviceList, devices);
      } else {
        return Promise.reject(`Device ${id} does not exist`);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getDevice(id: string): Promise<Device> {
    try {
      const devices = await this.getDevices();
      return Promise.resolve(devices.find(d => d.id === id));
    } catch (err) {
      Promise.reject(err);
    }
  }
}
