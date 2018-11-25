import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageDevice } from '../../model/storage-device';
import { DeviceService, mockDevice } from '../../services/device.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss']
})
export class DevicePage implements OnInit, OnDestroy {
  currentDevice: StorageDevice = mockDevice;
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
    // this.success = 'init';
    // this.platform.ready().then(() => {
    //   const device = this.device;
    //   this.success = 'ready';
    //   device.currentDevice$.pipe(takeUntil(this.destroy$)).subscribe(d => {
    //     this.success = 'device';
    //     this.currentDevice = d;
    //   });
    // });
  }

  ionViewWillEnter() {
    const device = this.device;
    this.success = 'ready';
    device.currentDevice$.pipe(takeUntil(this.destroy$)).subscribe(d => {
      this.success = 'device';
      this.currentDevice = d;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  removeDevice() {
    this.removeDeviceAsync()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        this.error = { message: err };
      });
  }

  async removeDeviceAsync() {
    const currentDevice = this.currentDevice;
    const loader = await this.loadingCtrl.create({
      message: `Removing Device ${currentDevice.id}....`
    });
    await loader.present();
    let res: Promise<void>;
    try {
      await this.device.removeDevice(currentDevice);
      res = Promise.resolve();
    } catch (err) {
      res = Promise.reject(err);
    }
    await loader.dismiss();
    return res;
  }
}
