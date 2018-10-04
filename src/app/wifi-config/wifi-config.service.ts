import { Injectable } from '@angular/core';
import { HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WifiConfigService {
  selectedNetwork$ = new ReplaySubject<HotspotNetwork>(1);

  constructor() { }
}
