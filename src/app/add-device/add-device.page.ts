import { WifiConfigService } from './../wifi-config/wifi-config.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { QrService } from '../scan-qr/qr.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss']
})
export class AddDevicePage implements OnInit, OnDestroy {
  error;
  success;
  destroy$ = new Subject();
  hasData = false;
  constructor(
    private platform: Platform,
    private qr: QrService,
    private router: Router,
    private wifiConfig: WifiConfigService,
    private loadingCtrl: LoadingController,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      const qr = this.qr;
      const destroy$ = this.destroy$;
      qr.data$.pipe(takeUntil(destroy$)).subscribe(({ ssid, password }) => {
        this.hasData = true;
        this.connectHotSpot(ssid, password)
          .then(() => {
            this.wifiConfig.accessPointSsid$.next(ssid);
            this.hasData = false;
            this.router.navigate(['./wifi-config']);
          })
          .catch(() => {
            this.error = {
              message:
                'Could not connect Device Acess Point. Reset your Device and wait until Status Diod is red. Check your QR Code'
            };
            this.changeDetector.detectChanges();
          });
      });
      qr.error$.pipe(takeUntil(destroy$)).subscribe(err => {
        this.hasData = true;
        this.error = err;
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  ionViewWillEnter() {
    if (!this.hasData) {
      this.scanQr();
    }
  }

  scanQr() {
    this.success = null;
    this.error = null;
    this.router.navigate(['/scan-qr']);
  }

  private async connectHotSpot(ssid, password): Promise<any> {
    const wifiConfig = this.wifiConfig;
    const loader = await this.loadingCtrl.create({
      message: 'Connecting Access Point....'
    });
    await loader.present();
    try {
      await wifiConfig.scanWifi();
      await wifiConfig.connectWifi(ssid, password);
      await loader.dismiss();
      return Promise.resolve();
    } catch (err) {
      await loader.dismiss();
      return Promise.reject(err);
    }
  }
}
