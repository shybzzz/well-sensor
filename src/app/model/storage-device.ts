import { IMqttServiceOptions } from 'ngx-mqtt';
import { SensorType } from '../definitions';

export interface StorageDevice {
  id: string;
  ssid: string;
  ipAddress: string;
  mqttOptions: IMqttServiceOptions;
  sensorType: SensorType;
}
