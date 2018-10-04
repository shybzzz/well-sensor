import { HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { WifiConfigService } from './../wifi-config.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-wifi-password',
  templateUrl: './wifi-password.page.html',
  styleUrls: ['./wifi-password.page.scss'],
})
export class WifiPasswordPage implements OnInit {

  destroyed$ = new Subject();
  network: HotspotNetwork;

  constructor(public wifiConfig: WifiConfigService) { }

  ngOnInit() {
    this.wifiConfig.selectedNetwork$.pipe(takeUntil(this.destroyed$)).subscribe((n) => {
      this.network = n;
    });
  }

}
