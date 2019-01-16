import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewMqttPage } from './new-mqtt.page';
import { LoggerModule } from '../../components/logger/logger.module';

const routes: Routes = [
  {
    path: '',
    component: NewMqttPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoggerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewMqttPage]
})
export class NewMqttPageModule {}
