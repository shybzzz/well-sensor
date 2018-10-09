import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'wifi-config',
    loadChildren: './wifi-config/wifi-config.module#WifiConfigPageModule'
  },
  {
    path: 'wifi-password',
    loadChildren:
      './wifi-config/wifi-password/wifi-password.module#WifiPasswordPageModule'
  },
  {
    path: 'add-device',
    loadChildren: './add-device/add-device.module#AddDevicePageModule'
  },
  {
    path: 'scan-qr',
    loadChildren: './scan-qr/scan-qr.module#ScanQrPageModule'
  },
  {
    path: 'device',
    loadChildren: './device/device.module#DevicePageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
