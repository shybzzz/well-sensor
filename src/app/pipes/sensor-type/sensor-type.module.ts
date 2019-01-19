import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorTypeIconPipe } from './sensor-type-icon.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SensorTypeIconPipe],
  exports: [SensorTypeIconPipe]
})
export class SensorTypeModule {}
