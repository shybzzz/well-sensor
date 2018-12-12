import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepthPipe } from './depth.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DepthPipe],
  exports: [DepthPipe]
})
export class DepthModule {}
