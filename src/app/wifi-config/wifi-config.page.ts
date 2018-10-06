import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { WifiConfigService } from './wifi-config.service';

@Component({
  selector: 'app-wifi-config',
  templateUrl: './wifi-config.page.html',
  styleUrls: ['./wifi-config.page.scss']
})
export class WifiConfigPage implements OnInit {
  networks: HotspotNetwork[] = [<HotspotNetwork>{ SSID: 'Earth', level: -60 }];

  constructor(
    private platform: Platform,
    private hotspot: Hotspot,
    private wifiConfig: WifiConfigService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.scanWifi();
    });
  }

  navigateToSetPassword(network: HotspotNetwork) {
    this.wifiConfig.selectedNetwork$.next(network);
  }

  async scanWifi() {
    const loader = await this.loadingCtrl.create({
      message: 'Scanning Wifi....'
    });
    await loader.present();
    this.networks = (await this.hotspot.scanWifi()).sort(
      (n1, n2) => n2.level - n1.level
    );
    await loader.dismiss();
  }
}
