import { IMqttServiceOptions } from 'ngx-mqtt';
export interface StorageDevice {
  id: string;
  ssid: string;
  ipAddress: string;
  mqttOptions: IMqttServiceOptions;
}
