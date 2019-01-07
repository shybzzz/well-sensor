import { ConfigMqtt } from './config-mqtt';
import { SensorType } from '../definitions';
export interface ConfigQr extends ConfigMqtt {
  deviceId: string;
  apSSID: string;
  apIP: string;
  appPwd: string;
  sensorType: SensorType;
}
