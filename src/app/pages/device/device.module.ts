import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DevicePage } from './device.page';
import { DepthModule } from '../../pipes/depth/depth.module';

const routes: Routes = [
  {
    path: '',
    component: DevicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepthModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevicePage]
})
export class DevicePageModule {}
