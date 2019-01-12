import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorTypePipe } from './sensor-type.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SensorTypePipe],
  exports: [SensorTypePipe]
})
export class SensorTypeModule {}
