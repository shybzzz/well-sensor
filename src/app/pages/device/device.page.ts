import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageDevice } from '../../model/storage-device';
import { DeviceService } from '../../services/device.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss']
})
export class DevicePage implements OnInit, OnDestroy {
  currentDevice: StorageDevice;
  success;
  error;

  value: string;

  destroy$ = new Subject();

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private device: DeviceService,
    private mqqt: MqttService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const mqtt = this.mqqt;

    const device = this.device;
    device.currentDevice$.pipe(takeUntil(this.destroy$)).subscribe(d => {
      this.currentDevice = d;
      // mqtt.disconnect(true);
      const mqttOptions = d.mqttOptions;
      if (mqttOptions) {
        this.mqqt.connect(mqttOptions);
        mqtt
          .observe('data')
          .pipe(takeUntil(this.destroy$))
          .subscribe(m => {
            this.value = m.payload.toString();
          });
      }
    });
  }

  ngOnDestroy() {
    this.mqqt.disconnect(true);
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

  async removeDeviceAsync(): Promise<any> {
    const currentDevice = this.currentDevice;
    const loader = await this.loadingCtrl.create({
      message: `Removing Device ${currentDevice.id}....`
    });
    loader.present();
    let res: Promise<void>;
    try {
      await this.device.removeDevice(currentDevice);
      res = Promise.resolve();
    } catch (err) {
      res = Promise.reject(err);
    }
    loader.dismiss();
    return res;
  }
}
