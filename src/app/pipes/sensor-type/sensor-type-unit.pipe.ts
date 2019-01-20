import { Pipe, PipeTransform } from '@angular/core';
import { SensorType } from '../../definitions';

@Pipe({
  name: 'sensorTypeUnit'
})
export class SensorTypeUnitPipe implements PipeTransform {
  transform(value: any, sensorType: SensorType): string {
    let res: string;
    switch (sensorType) {
      case SensorType.SENSOR_ANALOG_TEST:
        res = `${value} arb. units`;
        break;
      case SensorType.SENSOR_DS18B20:
        res = `${Math.round(value / 10) / 10} \xB0C`;
        break;
      case SensorType.SENSOR_GUT800:
        res = `${value} m.`;
        break;
      case SensorType.SENSOR_INA250A2PW:
        res = `${value} mA`;
        break;
      default:
        res = `${value} arb. units`;
    }
    return value && res;
  }
}
