import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MqttConnectionService } from './services/mqtt-connection.service';
import { SubscriptionService } from './services/subscription.service';
import { MqttConnectionState } from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SubscriptionService]
})
export class AppComponent implements OnInit {
  connectMqttPage = {
    title: 'Connect MQTT',
    url: '/new-mqtt',
    icon: 'cloud',
    color: undefined
  };
  appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      color: undefined
    },
    {
      title: 'Add Device',
      url: '/scan-qr',
      icon: 'qr-scanner',
      color: undefined
    },
    this.connectMqttPage
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mqttConnectionService: MqttConnectionService,
    private subscriptionService: SubscriptionService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.subscriptionService
      .takeUndilDestroyed(this.mqttConnectionService.state$)
      .subscribe(state => {
        this.connectMqttPage.color =
          state === MqttConnectionState.CONNECTED ? 'success' : undefined;
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
