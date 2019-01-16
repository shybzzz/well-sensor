import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { StorageDevice } from '../../model/storage-device';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceService } from '../../services/device.service';
import { MqttService, MqttConnectionState } from 'ngx-mqtt';
import {
  TOPIC_SEPARATOR,
  TOPIC_DATA,
  PAYLOAD_VALUE_DATA
} from '../../definitions';
import { getMqttValue } from '../../helpers/mqtt';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  devicesInfo: {
    device: StorageDevice;
    value?: number;
    state?: MqttConnectionState;
  }[] = [];
  success;
  error;
  destroy$ = new Subject();

  constructor(
    private loadingCtrl: LoadingController,
    private device: DeviceService,
    private mqtt: MqttService
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    this.device.devices$.pipe(takeUntil(this.destroy$)).subscribe(devices => {
      const mqtt = this.mqtt;

      devices
        .filter(d => !!d)
        .forEach(device => {
          this.devicesInfo = [...this.devicesInfo, { device }];
          mqtt.state.pipe(takeUntil(this.destroy$)).subscribe(state => {
            const devicesInfo = this.devicesInfo;
            const deviceIndex = devicesInfo.findIndex(
              d => d.device.id === device.id
            );
            if (deviceIndex > -1) {
              this.devicesInfo = [
                ...devicesInfo.slice(0, deviceIndex - 1),
                { ...devicesInfo[deviceIndex], state },
                ...devicesInfo.slice(deviceIndex + 1)
              ];
            }
          });

          mqtt.connect(device.mqttOptions);

          mqtt
            .observe(`${device.id}${TOPIC_SEPARATOR}${TOPIC_DATA}`)
            .pipe(takeUntil(this.destroy$))
            .subscribe(m => {
              const devicesInfo = this.devicesInfo;
              const deviceIndex = devicesInfo.findIndex(
                d => d.device.id === device.id
              );
              if (deviceIndex > -1) {
                const value = getMqttValue(m)[PAYLOAD_VALUE_DATA];
                this.devicesInfo = [
                  ...devicesInfo.slice(0, deviceIndex - 1),
                  { ...devicesInfo[deviceIndex], value },
                  ...devicesInfo.slice(deviceIndex + 1)
                ];
              }
            });
        });
    });
    this.loadDevices().catch(err => {
      this.error = { message: err };
    });

    this.mqtt.onConnect.subscribe(() => {});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.mqtt.disconnect();
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
    loader.dismiss();
    return res;
  }
}
