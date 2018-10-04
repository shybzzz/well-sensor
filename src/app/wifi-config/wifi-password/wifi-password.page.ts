import { WifiConfigService } from './../wifi-config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wifi-password',
  templateUrl: './wifi-password.page.html',
  styleUrls: ['./wifi-password.page.scss'],
})
export class WifiPasswordPage implements OnInit {

  constructor(public wifiConfig: WifiConfigService) { }

  ngOnInit() {

  }

}
