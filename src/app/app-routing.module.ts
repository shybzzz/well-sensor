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
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'wifi-config',
    loadChildren: './pages/wifi-config/wifi-config.module#WifiConfigPageModule'
  },
  {
    path: 'wifi-password',
    loadChildren:
      './pages/wifi-password/wifi-password.module#WifiPasswordPageModule'
  },
  {
    path: 'add-device',
    loadChildren: './pages/add-device/add-device.module#AddDevicePageModule'
  },
  {
    path: 'scan-qr',
    loadChildren: './pages/scan-qr/scan-qr.module#ScanQrPageModule'
  },
  {
    path: 'device',
    loadChildren: './pages//device/device.module#DevicePageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
