import { Pipe, PipeTransform } from '@angular/core';
import { SensorType } from '../../definitions';

@Pipe({
  name: 'sensorType'
})
export class SensorTypePipe implements PipeTransform {
  transform(sensorType: SensorType): any {
    return sensorType === SensorType.SENSOR_ANALOG_TEST
      ? 'potentiometer'
      : sensorType === SensorType.SENSOR_DS18B20
      ? 'temperature'
      : sensorType === SensorType.SENSOR_GUT800
      ? 'depth'
      : sensorType === SensorType.SENSOR_INA250A2PW
      ? 'solar'
      : 'simulated';
  }
}
