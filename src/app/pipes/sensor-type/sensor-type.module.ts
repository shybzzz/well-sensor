import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorTypeIconPipe } from './sensor-type-icon.pipe';
import { SensorTypeUnitPipe } from './sensor-type-unit.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SensorTypeIconPipe, SensorTypeUnitPipe],
  exports: [SensorTypeIconPipe, SensorTypeUnitPipe]
})
export class SensorTypeModule {}
