import { ConfigMqtt } from './config-mqtt';
export interface ConfigQr extends ConfigMqtt {
  deviceId: string;
  apSSID: string;
  apIP: string;
  appPwd: string;
}
