import { Injectable } from '@angular/core';
import { HotspotNetwork, Hotspot } from '@ionic-native/hotspot/ngx';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WifiConfigService {
  selectedNetwork$ = new ReplaySubject<HotspotNetwork>(1);
  networks$ = new ReplaySubject<HotspotNetwork[]>();
  currentSsid$ = new BehaviorSubject<string>('');

  availableNetworks$ = this.networks$.pipe(
    combineLatest(this.currentSsid$),
    map(([networks, ssid]) => {
      return networks
        .filter(network => network.SSID !== ssid && network.level > -80)
        .sort((n1, n2) => n2.level - n1.level);
    })
  );

  constructor(private hotspot: Hotspot) {}

  async scanWifi(): Promise<any> {
    const hotspot = this.hotspot;
    try {
      this.networks$.next(await hotspot.scanWifi());
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async connectWifi(ssid: string, password: string): Promise<any> {
    const hotspot = this.hotspot;
    try {
      await hotspot.connectToWifi(ssid, password);
      this.currentSsid$.next(ssid);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
