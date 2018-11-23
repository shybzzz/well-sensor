import { LoggerService } from './../../services/logger.service';
import {
  errorMessages,
  WIFI_CONFIG_SSID,
  WIFI_CONFIG_PWD
} from '../../definitions';
import { HotspotNetwork, Hotspot } from '@ionic-native/hotspot/ngx';
import { WifiConfigService } from '../../services/wifi-config.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TcpSockets } from '../../helpers/tcp-sockets';
import { Router } from '@angular/router';
import { DeviceStorageService } from '../../services/device-storage.service';
import {
  arrayBuffer2Response,
  str2ArrayBuffer
} from '../../helpers/array-converter';
import {
  SET_CONFIG_REQUEST_HEADER,
  MQTT_CONFIG_USER,
  MQTT_CONFIG_SERVER,
  MQTT_CONFIG_PORT,
  MQTT_CONFIG_PWD
} from '../../definitions';
import { QrService } from '../../services/qr.service';
import { QrConfig } from '../../model/qr-config';

@Component({
  selector: 'app-wifi-password',
  templateUrl: './wifi-password.page.html',
  styleUrls: ['./wifi-password.page.scss'],
  providers: [LoggerService]
})
export class WifiPasswordPage implements OnInit {
  destroyed$ = new Subject();
  network: HotspotNetwork;
  qrConfig: QrConfig;

  pwdControl = new FormControl('test_password', Validators.required);
  formGroup = this.formBuilder.group({ pwd: this.pwdControl });

  receiveDataHandler = info => {
    try {
      const response = arrayBuffer2Response<{ ip }>(info.data);
      this.wifiConnected(response.ip)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(err => {
          this.log(err);
        });
    } catch (er) {
      this.error(errorMessages[er] || er);
    }

    // tslint:disable-next-line:semicolon
  };

  constructor(
    public wifiConfig: WifiConfigService,
    public logger: LoggerService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private hotspot: Hotspot,
    private deviceStorage: DeviceStorageService,
    private qr: QrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.wifiConfig.selectedNetwork$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(n => {
        this.network = n;
      });
    this.qr.data$.pipe(takeUntil(this.destroyed$)).subscribe(config => {
      this.qrConfig = config;
    });
  }

  async sendWifiConfig(): Promise<any> {
    this.logger.clear();
    const loader = await this.loadingCtrl.create({
      message: 'Sending Wifi Config....'
    });
    let res: Promise<any>;
    loader.present();
    try {
      await this.sendNetworkData();
      res = Promise.resolve();
    } catch (er) {
      this.error(JSON.stringify(er));
      res = Promise.reject(er);
    }
    loader.dismiss();
    return res;
  }

  private async wifiConnected(ipAddress: string) {
    const network = this.network;
    const ssid = network && network.SSID;
    try {
      await this.deviceStorage.addDevice(this.qrConfig.deviceId, ssid, ipAddress);
      await this.hotspot.connectToWifi(ssid, this.pwdControl.value);
      return Promise.resolve();
    } catch (er) {
      return Promise.reject(er);
    }
  }

  private async sendNetworkData(): Promise<any> {
    try {
      const network = this.network;
      if (!network) {
        return Promise.reject('No network is defined');
      }

      const socketId = await TcpSockets.create();
      const qrConfig = this.qrConfig;

      await TcpSockets.connect(
        socketId,
        qrConfig.apIP
      );
      await TcpSockets.addReceiveHandler(this.receiveDataHandler);

      const creds = {};
      creds[WIFI_CONFIG_SSID] = network.SSID;
      creds[WIFI_CONFIG_PWD] = this.pwdControl.value;
      creds[MQTT_CONFIG_SERVER] = qrConfig.mqttServer;
      creds[MQTT_CONFIG_PORT] = qrConfig.mqttPort;
      creds[MQTT_CONFIG_USER] = qrConfig.mqttUser;
      creds[MQTT_CONFIG_PWD] = qrConfig.mqttPwd;

      const res = await TcpSockets.send(
        socketId,
        str2ArrayBuffer(SET_CONFIG_REQUEST_HEADER, JSON.stringify(creds))
      );

      return new Promise<any>(resolve => {
        this.log('Data sent');
        setTimeout(() => {
          TcpSockets.removeReceiveHandler(this.receiveDataHandler);
          TcpSockets.disconnect(socketId);
          TcpSockets.close(socketId);
          resolve(res);
        }, 6000);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  private log(message) {
    this.logger.log(message);
  }

  private error(message) {
    this.logger.error(message);
  }
}
