import { Injectable } from '@angular/core';
import { MqttService, MqttConnectionState } from 'ngx-mqtt';
import { ConfigMqtt } from '../model/config-mqtt';
import { toMqttOptions } from '../helpers/mqtt';
import { Subject } from 'rxjs';
import { skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MqttConnectionService {
  state$ = new Subject<MqttConnectionState>();
  constructor(private mqttService: MqttService) {}

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
          resolve();
        }
      });

      setTimeout(() => {
        if (!connected) {
          reject('Connection Timeout');
        }
      }, 5000);
      mqttService.connect(toMqttOptions(configMqtt));
    });
  }
}
