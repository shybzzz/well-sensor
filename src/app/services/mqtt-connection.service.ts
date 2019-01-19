import { Injectable } from '@angular/core';
import { MqttService, MqttConnectionState, IMqttMessage } from 'ngx-mqtt';
import { ConfigMqtt } from '../model/config-mqtt';
import { toMqttOptions, getDeviceDataTopic } from '../helpers/mqtt.helper';
import { Observable, ReplaySubject } from 'rxjs';
import { skip, filter } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MqttConnectionService {
  state$ = new ReplaySubject<MqttConnectionState>(1);

  connected$ = this.state$.pipe(
    filter(state => state === MqttConnectionState.CONNECTED)
  );

  constructor(
    private mqttService: MqttService,
    private storageService: StorageService
  ) {}

  async connect(configMqtt: ConfigMqtt): Promise<any> {
    const mqttService = this.mqttService;
    const state$ = mqttService.state;
    return new Promise<any>((resolve, reject) => {
      if (state$.value === MqttConnectionState.CONNECTED) {
        mqttService.disconnect();
      }
      let connected = false;
      const subscription = state$.pipe(skip(1)).subscribe(state => {
        this.state$.next(state);
        connected = state === MqttConnectionState.CONNECTED;
        if (connected) {
          subscription.unsubscribe();
          this.storageService.saveConfigMqtt(configMqtt).then(() => {
            resolve();
          });
        }
      });

      setTimeout(() => {
        if (!connected) {
          subscription.unsubscribe();
          reject('Connection Timeout');
        }
      }, 5000);
      mqttService.connect(toMqttOptions(configMqtt));
    });
  }

  async connectCashed(): Promise<any> {
    let res: Promise<any>;
    try {
      await this.connect(await this.getCashedConfig());
      res = Promise.resolve();
    } catch (err) {
      res = Promise.reject(err);
    }
    return res;
  }

  public async getCashedConfig(): Promise<ConfigMqtt> {
    return await this.storageService.getConfigMqtt();
  }

  public observeDeviceData(deviceId: string): Observable<IMqttMessage> {
    return this.mqttService.observe(getDeviceDataTopic(deviceId));
  }
}
