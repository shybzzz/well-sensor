import { ConfigMqtt } from './config-mqtt';
export interface ResponseDeviceConnected extends ConfigMqtt {
  ip: string;
  ssid: string;
}
