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
  },
  {
    path: 'new-mqtt',
    loadChildren: './pages/new-mqtt/new-mqtt.module#NewMqttPageModule'
  },
  {
    path: 'device-list',
    loadChildren: './pages/device-list/device-list.module#DeviceListPageModule'
  },  { path: 'new-device', loadChildren: './pages/new-device/new-device.module#NewDevicePageModule' },
  { path: 'existing-device', loadChildren: './pages/existing-device/existing-device.module#ExistingDevicePageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
