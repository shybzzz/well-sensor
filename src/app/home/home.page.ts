import { DeviceStorageService } from './../services/device-storage.service';
import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Device } from '../model/device';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  devices: Device[];
  success;
  error;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private deviceStorage: DeviceStorageService
  ) {}

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.loadDevices();
    });
  }

  async removeDevice(id) {
    try {
      const loader = await this.loadingCtrl.create({
        message: `Removing Device ${id}....`
      });
      await loader.present();
      await this.deviceStorage.removeDevice(id);
      this.devices = await this.deviceStorage.getDevices();
      await loader.dismiss();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  private async loadDevices() {
    const loader = await this.loadingCtrl.create({
      message: 'Loading Config....'
    });
    await loader.present();
    this.devices = await this.deviceStorage.getDevices();
    await loader.dismiss();
  }
}
