import {
  SUCCESS_RESPONSE_RESULT,
  WIFI_CONFIG_REQUEST_HEADER
} from './../../definitions';
import { HotspotNetwork, Hotspot } from '@ionic-native/hotspot/ngx';
import { WifiConfigService } from './../wifi-config.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TcpSockets } from '../../helpers/tcp-sockets';
import {
  INVALID_WIFI_CONFIG_RESPONSE_HEADER,
  WIFI_CONNECTION_FAILED_RESPONSE_HEADER
} from '../../definitions';
import { Router } from '@angular/router';
import { DeviceStorageService } from '../../services/device-storage.service';
import {
  arrayBuffer2Response,
  str2ArrayBuffer
} from '../../helpers/array-converter';

@Component({
  selector: 'app-wifi-password',
  templateUrl: './wifi-password.page.html',
  styleUrls: ['./wifi-password.page.scss']
})
export class WifiPasswordPage implements OnInit {
  destroyed$ = new Subject();
  network: HotspotNetwork;
  error;
  success;

  pwdControl = new FormControl('rostyk10-10', Validators.required);
  formGroup = this.formBuilder.group({ pwd: this.pwdControl });

  receiveDataHandler = info => {
    const response = arrayBuffer2Response(info.data);
    this.success = response;
    const responseResult = response.responseResult;
    if (responseResult === SUCCESS_RESPONSE_RESULT) {
      const ipAddress = response.data;
      this.wifiConnected(ipAddress)
        .then(() => {
          // this.router.navigate(['/home']);
        })
        .catch(err => {
          this.error = err;
        });
    } else if (responseResult === INVALID_WIFI_CONFIG_RESPONSE_HEADER) {
      this.error = {
        message: `Error. Invalid wifiConfig is received`
      };
    } else if (responseResult === WIFI_CONNECTION_FAILED_RESPONSE_HEADER) {
      this.error = {
        message: `Error. Could not connect to wifi with wifiConfig provided`
      };
    }
    // tslint:disable-next-line:semicolon
  };

  constructor(
    public wifiConfig: WifiConfigService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private hotspot: Hotspot,
    private deviceStorage: DeviceStorageService
  ) {}

  ngOnInit() {
    this.wifiConfig.selectedNetwork$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(n => {
        this.network = n;
      });
  }

  async sendWifiConfig() {
    this.error = null;
    const loader = await this.loadingCtrl.create({
      message: 'Sending Wifi Config....'
    });
    await loader.present();
    try {
      await this.sendNetworkData();
    } catch (err) {
      this.error = err;
    }
    await loader.dismiss();
  }

  private async wifiConnected(ipAddress: string) {
    const network = this.network;
    const ssid = network && network.SSID;
    try {
      await this.deviceStorage.addDevice(ssid, ipAddress);
      await this.hotspot.connectToWifi(ssid, this.pwdControl.value);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  private async sendNetworkData(): Promise<any> {
    try {
      const network = this.network;
      if (!network) {
        return Promise.reject({ message: 'No network is defined' });
      }

      const socketId = await TcpSockets.create();
      await TcpSockets.connect(
        socketId,
        '192.168.4.1'
      );
      await TcpSockets.addReceiveHandler(this.receiveDataHandler);

      const res = await TcpSockets.send(
        socketId,
        str2ArrayBuffer(
          WIFI_CONFIG_REQUEST_HEADER,
          network.SSID,
          this.pwdControl.value
        )
      );

      return new Promise<any>(resolve => {
        this.success = 'Data sent';
        setTimeout(() => {
          TcpSockets.removeReceiveHandler(this.receiveDataHandler);
          TcpSockets.disconnect(socketId);
          TcpSockets.close(socketId);
          resolve(res);
        }, 5000);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
