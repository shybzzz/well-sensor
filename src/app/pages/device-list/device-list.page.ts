import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { StorageDevice } from '../../model/storage-device';
import { SubscriptionService } from '../../services/subscription.service';
import { MqttConnectionService } from '../../services/mqtt-connection.service';
import { DeviceService } from '../../services/device.service';
import { combineLatest, withLatestFrom } from 'rxjs/operators';
import { PAYLOAD_VALUE_DATA } from '../../definitions';
import { LoadingController } from '@ionic/angular';
import { getMqttValue } from '../../helpers/mqtt.helper';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
  providers: [LoggerService, SubscriptionService]
})
export class DeviceListPage implements OnInit {
  devicesInfo: {
    device: StorageDevice;
    value?: number;
  }[] = [];
  constructor(
    private subscriptionService: SubscriptionService,
    private mqttConnectionService: MqttConnectionService,
    private deviceService: DeviceService,
    private loggerService: LoggerService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    const mqttConnectionService = this.mqttConnectionService;
    const subscriptionService = this.subscriptionService;

    subscriptionService
      .takeUntilDestroyed(
        this.deviceService.devices$.pipe(
          withLatestFrom(mqttConnectionService.connected$)
        )
      )
      .subscribe(([devices]) => {
        this.devicesInfo = [];
        devices
          .filter(d => !!d)
          .forEach(device => {
            this.devicesInfo = [...this.devicesInfo, { device }];
            subscriptionService
              .takeUntilDestroyed(
                mqttConnectionService.observeDeviceData(device.id)
              )
              .subscribe(m => {
                const devicesInfo = this.devicesInfo;
                const deviceIndex = devicesInfo.findIndex(
                  d => d.device.id === device.id
                );
                if (deviceIndex > -1) {
                  const value = getMqttValue(m)[PAYLOAD_VALUE_DATA];
                  this.devicesInfo[deviceIndex].value = value;
                }
              });
          });
      });

    this.loadDevices().catch(err => {
      this.loggerService.error(err);
    });
  }

  openDevicePage(device: StorageDevice) {
    this.deviceService.currentDevice$.next(device);
  }

  private async loadDevices(): Promise<void> {
    const loader = await this.loadingCtrl.create({
      message: 'Loading Devices....'
    });
    await loader.present();
    let res: Promise<void>;
    try {
      await this.deviceService.resetDevices();
      res = Promise.resolve();
    } catch (err) {
      res = Promise.reject(err);
    }
    loader.dismiss();
    return res;
  }
}
