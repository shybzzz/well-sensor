import { Injectable } from '@angular/core';
import { ConfigMqtt } from '../model/config-mqtt';
import { Storage } from '@ionic/storage';

const CONFIG_MQTT = 'configMqtt';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {}

  async saveConfigMqtt(newConfigMqtt: ConfigMqtt): Promise<any> {
    const storage = this.storage;
    let res: Promise<any>;
    try {
      await storage.ready();
      const configMqtt = await storage.get(CONFIG_MQTT);
      await storage.set(CONFIG_MQTT, { ...configMqtt, ...newConfigMqtt });
      res = Promise.resolve();
    } catch (err) {
      res = Promise.reject(err);
    }
    return res;
  }

  async getConfigMqtt(): Promise<ConfigMqtt> {
    const storage = this.storage;
    await storage.ready();
    return await storage.get(CONFIG_MQTT);
  }
}
