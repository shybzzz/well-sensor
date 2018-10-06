import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  wellSensorIpAdress: string;
  wellSensorSSID: string;

  constructor(
    private platform: Platform,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.loadConfig();
    });
  }

  private async loadConfig() {
    const loader = await this.loadingCtrl.create({
      message: 'Loading Config....'
    });
    await loader.present();
    const storage = this.storage;
    this.wellSensorIpAdress = await storage.get('wellSensorIpAdress');
    this.wellSensorSSID = await storage.get('wellSensorSSID');
    await loader.dismiss();
  }
}
