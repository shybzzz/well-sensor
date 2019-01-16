import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsDefinedPipe } from './is-defined.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [IsDefinedPipe],
  exports: [IsDefinedPipe]
})
export class FilterPipesModule {}
