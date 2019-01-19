import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceListPage } from './device-list.page';
import { LoggerModule } from '../../components/logger/logger.module';
import { SensorTypeModule } from '../../pipes/sensor-type/sensor-type.module';

const routes: Routes = [
  {
    path: '',
    component: DeviceListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoggerModule,
    SensorTypeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceListPage]
})
export class DeviceListPageModule {}
