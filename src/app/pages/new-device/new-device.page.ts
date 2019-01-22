import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoggerService } from '../../services/logger.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { QrService } from '../../services/qr.service';
import { SensorType } from '../../definitions';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.page.html',
  styleUrls: ['./new-device.page.scss'],
  providers: [LoggerService, SubscriptionService]
})
export class NewDevicePage implements OnInit {
  deviceId = new FormControl('', [Validators.required]);
  sensorType = new FormControl(null, [Validators.required]);
  apSSID = new FormControl(null, [Validators.required]);
  apIP = new FormControl('', [Validators.required]);
  appPwd = new FormControl('', [Validators.required]);
  ssid = new FormControl(null, [Validators.required]);
  wifiPwd = new FormControl('', [Validators.required]);

  accessPointNetworks: HotspotNetwork[];
  accessPointSsid: string;
  selectedSsid: string;

  formGroup = this.formBuilder.group({
    deviceId: this.deviceId,
    sensorType: this.sensorType,
    apSSID: this.apSSID,
    apIP: this.apIP,
    appPwd: this.appPwd,
    ssid: this.ssid,
    wifiPwd: this.wifiPwd
  });

  constructor(
    public location: Location,
    private loggerService: LoggerService,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private qrService: QrService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    const subscriptionService = this.subscriptionService;
    const qrService = this.qrService;
    subscriptionService.takeUntilDestroyed(qrService.data$).subscribe(d => {
      this.formGroup.patchValue(d);
    });

    const loggerService = this.loggerService;
    subscriptionService.takeUntilDestroyed(qrService.error$).subscribe(err => {
      loggerService.error(err);
    });
  }

  scanQr() {
    this.loggerService.clear();
    this.router.navigate(['/scan-qr']);
  }

  connectDevice() {}
}
