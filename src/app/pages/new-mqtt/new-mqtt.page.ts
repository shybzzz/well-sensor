import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MqttConnectionState } from 'ngx-mqtt';
import { Router } from '@angular/router';
import { QrService } from '../../services/qr.service';
import { SubscriptionService } from '../../services/subscription.service';
import { LoggerService } from '../../services/logger.service';
import { MqttConnectionService } from '../../services/mqtt-connection.service';

@Component({
  selector: 'app-new-mqtt',
  templateUrl: './new-mqtt.page.html',
  styleUrls: ['./new-mqtt.page.scss'],
  providers: [SubscriptionService, LoggerService]
})
export class NewMqttPage implements OnInit {
  server = new FormControl('', [Validators.required]);
  port = new FormControl(null, [Validators.required]);
  wssPort = new FormControl(null, [Validators.required]);
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
    private mqttConnectionService: MqttConnectionService,
    private router: Router,
    private qrService: QrService,
    private subscriptionService: SubscriptionService,
    private loggerService: LoggerService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    const subscriptionService = this.subscriptionService;
    const qrService = this.qrService;
    subscriptionService.takeUntilDestroyed(qrService.data$).subscribe(d => {
      this.formGroup.patchValue(d);
    });

    const loggerService = this.loggerService;
    subscriptionService.takeUntilDestroyed(qrService.error$).subscribe(err => {
      loggerService.error(err);
    });

    subscriptionService
      .takeUntilDestroyed(this.mqttConnectionService.state$)
      .subscribe(state => {
        this.state = state;
        if (state === MqttConnectionState.CONNECTED) {
          loggerService.log('MQTT is connected');
        } else if (state === MqttConnectionState.CONNECTING) {
          loggerService.log('Connecting MQTT...');
        } else {
          loggerService.error('MQTT is not connected');
        }
      });

    this.mqttConnectionService.getCashedConfig().then(config => {
      this.formGroup.patchValue(config);
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
    try {
      await this.mqttConnectionService.connect(this.formGroup.value);
    } catch (err) {
      this.loggerService.error(err);
    }
    loader.dismiss();
  }
}
