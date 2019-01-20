import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MqttConnectionService } from '../../services/mqtt-connection.service';
import { SubscriptionService } from '../../services/subscription.service';
import { MqttConnectionState } from 'ngx-mqtt';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [SubscriptionService]
})
export class HomePage implements OnInit {
  destroy$ = new Subject();

  constructor(
    private router: Router,
    private mqttConnectionService: MqttConnectionService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    this.subscriptionService
      .takeUntilDestroyed(this.mqttConnectionService.state$)
      .subscribe(state =>
        this.router.navigate([
          state === MqttConnectionState.CONNECTED ? 'device-list' : 'new-mqtt'
        ])
      );
  }
}
