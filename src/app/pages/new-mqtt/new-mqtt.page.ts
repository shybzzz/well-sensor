import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MqttService, MqttConnectionState } from 'ngx-mqtt';
import { Router } from '@angular/router';
import { QrService } from '../../services/qr.service';
import { SubscriptionService } from '../../services/subscription.service';
import { LoggerService } from '../../services/logger.service';
import { toMqttOptions } from '../../helpers/mqtt';

@Component({
  selector: 'app-new-mqtt',
  templateUrl: './new-mqtt.page.html',
  styleUrls: ['./new-mqtt.page.scss'],
  providers: [SubscriptionService, LoggerService]
})
export class NewMqttPage implements OnInit {
  server = new FormControl('', [Validators.required]);
  port = new FormControl('', [Validators.required]);
  wssPort = new FormControl('', [Validators.required]);
  user = new FormControl('', [Validators.required]);
  mqttPwd = new FormControl('', [Validators.required]);

  formGroup = this.formBuider.group({
    server: this.server,
    port: this.port,
    wssPort: this.wssPort,
    user: this.user,
    mqttPwd: this.mqttPwd
  });

  state: MqttConnectionState;

  constructor(
    private formBuider: FormBuilder,
    private mqttService: MqttService,
    private router: Router,
    private qrService: QrService,
    private subscriptionService: SubscriptionService,
    private loggerService: LoggerService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    const subscriptionService = this.subscriptionService;
    const qrService = this.qrService;
    subscriptionService
      .takeUndilDestroyed(qrService.data$)
      .subscribe(d => {
        this.formGroup.patchValue(d);
      });
      subscriptionService.takeUndilDestroyed(qrService.error$).subscribe(err => {
        this.loggerService.error(err);
      })

    subscriptionService
      .takeUndilDestroyed(this.mqttService.state)
      .subscribe(state => {
        this.state = state;
        const loggerService = this.loggerService;
        if (state === MqttConnectionState.CONNECTED) {
          loggerService.log('MQTT is connected');
        } else if (state === MqttConnectionState.CONNECTING) {
          loggerService.log('Connecting MQTT...');
        } else {
          loggerService.error('MQTT is not connected');
        }
      });
  }

  scanQr() {
    this.loggerService.clear();
    this.router.navigate(['/scan-qr']);
  }

  async connectMqtt() {
    this.loggerService.clear();
    const loader = await this.loadingCtrl.create({
      message: 'Sending Config....'
    });
    await loader.present();
    const mqttService = this.mqttService;
    if (this.state === MqttConnectionState.CONNECTED) {
      mqttService.disconnect();
    }
    mqttService.connect(toMqttOptions(this.formGroup.value));
    loader.dismiss();
  }
}
