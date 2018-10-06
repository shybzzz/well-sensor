import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  wellSensorIpAdress: string;
  wellSensorSSID: string;

  constructor(private platform: Platform, private storage: Storage) {}

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.storage.get('wellSensorIpAdress').then(ipAdress => {
        this.wellSensorIpAdress = ipAdress;
      });
      this.storage.get('wellSensorSSID').then(ssid => {
        this.wellSensorSSID = ssid;
      });
    });
  }
}
