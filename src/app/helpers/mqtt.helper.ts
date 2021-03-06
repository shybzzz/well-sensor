import { PAYLOAD_VALUE, TOPIC_DATA, TOPIC_SEPARATOR } from '../definitions';
import { IMqttMessage, IMqttServiceOptions } from 'ngx-mqtt';
import { ConfigMqtt } from '../model/config-mqtt';

export function getMqttValue(m: IMqttMessage) {
  try {
    const payload = JSON.parse(m.payload.toString());
    return payload && payload[PAYLOAD_VALUE];
  } catch (err) {
    return null;
  }
}

export function toMqttOptions(mqttConfig: ConfigMqtt): IMqttServiceOptions {
  return {
    username: mqttConfig.user,
    password: mqttConfig.mqttPwd,
    servers: [{ host: mqttConfig.server, port: mqttConfig.wssPort }]
  };
}

export function getDeviceDataTopic(deviceId: string): string {
  return getDeviceTopic(deviceId, TOPIC_DATA);
}

export function getDeviceTopic(deviceId: string, topic: string): string {
  return `${deviceId}${TOPIC_SEPARATOR}${topic}`;
}
