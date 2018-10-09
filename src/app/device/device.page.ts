import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Device } from '../model/device';
import { DeviceService } from './device.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss']
})
export class DevicePage implements OnInit, OnDestroy {
  currentDevice: Device;
  success;
  error;
  destroy$ = new Subject();
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private router: Router,
    private device: DeviceService
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      const device = this.device;
      device.deviceId$.pipe(takeUntil(this.destroy$)).subscribe(deviceId => {
        this.loadDevice(deviceId).catch(err => {
          this.error = { message: err };
        });
      });
      device.currentDevice$.pipe(takeUntil(this.destroy$)).subscribe(d => {
        this.currentDevice = d;
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  removeDevice(id) {
    this.removeDeviceAsync(id).then(() => {
      this.router.navigate(['/home']);
    });
  }

  async removeDeviceAsync(id) {
    const loader = await this.loadingCtrl.create({
      message: `Removing Device ${id}....`
    });
    await loader.present();
    let res: Promise<void>;
    try {
      await this.device.removeDevice(id);
      res = Promise.resolve();
    } catch (err) {
      res = Promise.reject(err);
    }
    await loader.dismiss();
    return res;
  }

  private async loadDevice(deviceId: string): Promise<void> {
    const loader = await this.loadingCtrl.create({
      message: 'Loading Device....'
    });
    await loader.present();
    let res: Promise<void>;
    try {
      await this.device.setCurrentDevice(deviceId);
      res = Promise.resolve();
    } catch (err) {
      res = Promise.reject();
    }
    await loader.dismiss();
    return res;
  }
}
