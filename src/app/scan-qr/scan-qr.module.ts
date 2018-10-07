import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScanQrPage } from './scan-qr.page';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

const routes: Routes = [
  {
    path: '',
    component: ScanQrPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScanQrPage],
  providers: [QRScanner]
})
export class ScanQrPageModule {}
