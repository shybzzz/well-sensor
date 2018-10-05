import { ArrayConverter } from './../../helpers/array-converter';
import { HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { WifiConfigService } from './../wifi-config.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TcpSockets } from '../../helpers/tcp-sockets';

@Component({
  selector: 'app-wifi-password',
  templateUrl: './wifi-password.page.html',
  styleUrls: ['./wifi-password.page.scss']
})
export class WifiPasswordPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  network: HotspotNetwork;
  error;

  pwdControl = new FormControl('rostyk10-10', Validators.required);
  formGroup = this.formBuilder.group({ pwd: this.pwdControl });

  wellSensorWifiFailure = info => {
    const data = info.data;
    this.error = {
      message: `Well Sensor failed to connect Wifi (Error: ${
        new Uint8Array(data)[0]
      })`
    };
  };

  constructor(
    public wifiConfig: WifiConfigService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.wifiConfig.selectedNetwork$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(n => {
        this.network = n;
      });
    TcpSockets.addReceiveHandler(this.wellSensorWifiFailure);
  }

  ngOnDestroy() {
    TcpSockets.removeReceiveHandler(this.wellSensorWifiFailure).then();
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

      const res = await TcpSockets.send(
        socketId,
        ArrayConverter.str2ArrayBuffer(network.SSID, this.pwdControl.value)
      );

      await TcpSockets.setKeepAlive(socketId);

      await TcpSockets.disconnect(socketId);
      await TcpSockets.close(socketId);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
