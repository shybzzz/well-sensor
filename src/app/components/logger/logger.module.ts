import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerComponent } from './logger.component';
import { IonicModule } from '@ionic/angular';
import { FilterPipesModule } from '../../pipes/filter-pipes/filter-pipes.module';

@NgModule({
  imports: [CommonModule, IonicModule, FilterPipesModule],
  declarations: [LoggerComponent],
  exports: [LoggerComponent]
})
export class LoggerModule {}
