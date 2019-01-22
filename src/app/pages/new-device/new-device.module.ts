import { SensorTypeModule } from './../../pipes/sensor-type/sensor-type.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewDevicePage } from './new-device.page';
import { LoggerModule } from '../../components/logger/logger.module';

const routes: Routes = [
  {
    path: '',
    component: NewDevicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SensorTypeModule,
    LoggerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewDevicePage]
})
export class NewDevicePageModule {}
