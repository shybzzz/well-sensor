import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Device } from '../model/device';
import { generateId, deviceList } from '../helpers/device-storage';

@Injectable({
  providedIn: 'root'
})
export class DeviceStorageService {
  constructor(private storage: Storage) {}

  async addDevice(
    id: string,
    ssid: string,
    ipAddress: string
  ): Promise<Device> {
    try {
      const storage = this.storage;
      let devices = await this.getDevices();
      const deviceIndex = devices.findIndex(d => d.id === id);
      let device: Device;
      if (deviceIndex === -1) {
        device = { id, ssid, ipAddress };
        devices = [device, ...devices];
      } else {
        device = devices[deviceIndex];
        device.ssid = ssid;
        device.ipAddress = ipAddress;
      }
      await storage.set(deviceList, devices);

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
