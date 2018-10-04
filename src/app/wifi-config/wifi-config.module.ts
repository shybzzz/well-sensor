import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WifiConfigPage } from './wifi-config.page';
import { Hotspot } from '@ionic-native/hotspot/ngx';

const routes: Routes = [
  {
    path: '',
    component: WifiConfigPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WifiConfigPage],
  providers: [Hotspot]
})
export class WifiConfigPageModule { }
