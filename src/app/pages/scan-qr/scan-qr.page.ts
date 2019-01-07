import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { QrService } from '../../services/qr.service';
import { Router } from '@angular/router';
import { WifiConfigService } from '../../services/wifi-config.service';
import { ConfigQr } from '../../model/config-qr';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss']
})
export class ScanQrPage implements OnInit, OnDestroy {
  constructor(
    private platform: Platform,
    private qrScanner: QRScanner,
    private qr: QrService,
    private wifiConfig: WifiConfigService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.scanQr();
  }

  ngOnDestroy() {
    // this.qrScanner.destroy();
  }

  async scanQr() {
    const qr = this.qr;
    try {
      const qrStatus = await this.qrScanner.prepare();
      if (qrStatus.authorized) {
        const scanSub = this.qrScanner.scan().subscribe(
          (text: string) => {
            try {
              const qrConfig: ConfigQr = JSON.parse(text);
              qr.data$.next(qrConfig);
              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
              const apSSID = qrConfig.apSSID;
              this.connectHotSpot(apSSID, qrConfig.appPwd)
                .then(() => {
                  this.router.navigate(['./wifi-config']);
                })
                .catch(er => {
                  this.handleError(
                    `Could not connect Device Acess Point.
                     Reset your Device and wait until Status Diod is red. Check your QR Code: ${JSON.stringify(
                       er
                     )}`
                  );
                });
            } catch (err) {
              this.handleError(`QR is not valid: ${JSON.stringify(err)}`);
            }
          },
          err => {
            this.handleError(err);
          }
        );
        this.qrScanner.show();
      } else {
        this.handleError('Could not access QR Scanner');
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(message: any) {
    this.qr.error$.next({ message: message });
    this.router.navigate(['/add-device']);
  }

  private async connectHotSpot(ssid, password): Promise<any> {
    const wifiConfig = this.wifiConfig;
    const loader = await this.loadingCtrl.create({
      message: 'Connecting Access Point....'
    });
    loader.present();
    let res;
    try {
      await wifiConfig.scanWifi();
      await wifiConfig.connectWifi(ssid, password);
      res = Promise.resolve();
    } catch (err) {
      res = Promise.reject(err);
    }

    loader.dismiss();
    return res;
  }
}
