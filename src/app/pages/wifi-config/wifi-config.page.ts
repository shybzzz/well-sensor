import { Subject } from 'rxjs/internal/Subject';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { WifiConfigService } from '../../services/wifi-config.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-wifi-config',
  templateUrl: './wifi-config.page.html',
  styleUrls: ['./wifi-config.page.scss']
})
export class WifiConfigPage implements OnInit, OnDestroy {
  networks: HotspotNetwork[] = [<HotspotNetwork>{ SSID: 'Earth', level: -60 }];
  destroy$ = new Subject();
  error;
  success;

  constructor(
    private platform: Platform,
    private wifiConfig: WifiConfigService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.wifiConfig.availableNetworks$
        .pipe(takeUntil(this.destroy$))
        .subscribe(networks => {
          this.networks = networks;
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  navigateToSetPassword(network: HotspotNetwork) {
    this.wifiConfig.selectedNetwork$.next(network);
  }

  async scanWifi() {
    const loader = await this.loadingCtrl.create({
      message: 'Scanning Wifi....'
    });
    await loader.present();
    try {
      await this.wifiConfig.scanWifi();
      await loader.dismiss();
    } catch (err) {
      this.error = { message: err };
      await loader.dismiss();
    }
  }
}
