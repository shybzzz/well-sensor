import { ArrayConverter } from './../../helpers/array-converter';
import { HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { WifiConfigService } from './../wifi-config.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class WifiPasswordPage implements OnInit {
  destroyed$ = new Subject();
  network: HotspotNetwork;
  error;

  pwdControl = new FormControl('rostyk10-10', Validators.required);
  formGroup = this.formBuilder.group({ pwd: this.pwdControl });

  wellSensorWifiFailure = info => {
    const data = new Uint8Array(info.data);
    if (data[0] === 10) {
      this.error = {
        message: `Well Sensor failed to connect Wifi`
      };
      this.changeDetector.detectChanges();
    }
  };

  constructor(
    public wifiConfig: WifiConfigService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private changeDetector: ChangeDetectorRef
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
      await TcpSockets.addReceiveHandler(this.wellSensorWifiFailure);

      const res = await TcpSockets.send(
        socketId,
        ArrayConverter.str2ArrayBuffer(network.SSID, this.pwdControl.value)
      );

      return new Promise<any>(resolve => {
        setTimeout(() => {
          TcpSockets.removeReceiveHandler(this.wellSensorWifiFailure);
          TcpSockets.disconnect(socketId);
          TcpSockets.close(socketId);
          resolve(res);
        }, 7000);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
