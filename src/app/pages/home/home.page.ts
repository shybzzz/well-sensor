import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { StorageDevice } from '../../model/storage-device';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  devices: StorageDevice[];
  success;
  error;
  destroy$ = new Subject();

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private device: DeviceService
  ) {}

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.device.devices$.pipe(takeUntil(this.destroy$)).subscribe(devices => {
        this.devices = devices;
      });
      this.loadDevices().catch(err => {
        this.error = { message: err };
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  openDevicePage(device: StorageDevice) {
    this.device.currentDevice$.next(device);
  }

  private async loadDevices(): Promise<void> {
    const loader = await this.loadingCtrl.create({
      message: 'Loading Devices....'
    });
    await loader.present();
    let res: Promise<void>;
    try {
      await this.device.resetDevices();
      res = Promise.resolve();
    } catch (err) {
      res = Promise.reject(err);
    }
    await loader.dismiss();
    return res;
  }
}
