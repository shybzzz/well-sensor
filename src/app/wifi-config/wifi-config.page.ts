import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';

@Component({
  selector: 'app-wifi-config',
  templateUrl: './wifi-config.page.html',
  styleUrls: ['./wifi-config.page.scss']
})
export class WifiConfigPage implements OnInit {
  networks: HotspotNetwork[] = [<HotspotNetwork>{ SSID: 'Earth', level: -60 }];


  constructor(private platform: Platform, private hotspot: Hotspot) { }

  ngOnInit() {

    this.platform.ready().then(() => {
      this.scanWifi();
    });
  }

  navigateToSetPassword() {
    // this.wifiConfig.selectedNetwork$.next(network);
    // this.router.navigate(['/wifi-password'], { relativeTo: this.activatedRoute });
  }

  scanWifi() {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.networks = networks.sort((n1, n2) => (n2.level - n1.level));
    });
  }

}
