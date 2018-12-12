// TCP Request headers
export const SET_WIFI_CONFIG_REQUEST_HEADER = 1;
export const GET_IP_REQUEST_HEADER = 2;
export const SET_CONFIG_REQUEST_HEADER = 3;

// TCP Response headers
export const INVALID_WIFI_CONFIG_RESPONSE_HEADER = 1;
export const WIFI_CONNECTION_FAILED_RESPONSE_HEADER = 2;
export const SAVE_WIFI_FAILED_RESPONSE_HEADER = 3;
export const SAVE_MQTT_FAILED_RESPONSE_HEADER = 4;
export const MQTT_CONNECTION_FAILED_RESPONSE_HEADER = 5;
export const INVALID_MQTT_CONFIG_RESPONSE_HEADER = 6;

// Error Messages
export const errorMessages = {};
errorMessages[INVALID_WIFI_CONFIG_RESPONSE_HEADER] =
  'Error. Invalid wifiConfig is received';
errorMessages[WIFI_CONNECTION_FAILED_RESPONSE_HEADER] =
  'Error. Could not connect to wifi with wifiConfig provided';
errorMessages[SAVE_WIFI_FAILED_RESPONSE_HEADER] = 'Saving wifiConfig failed';
errorMessages[MQTT_CONNECTION_FAILED_RESPONSE_HEADER] =
  'Error. Could not connect to MQTT with mqttConfig provided';
errorMessages[SAVE_MQTT_FAILED_RESPONSE_HEADER] = 'Saving mqttConfig failed';
errorMessages[INVALID_MQTT_CONFIG_RESPONSE_HEADER] =
  'Error. Invalid mqttConfig is received';

// WIFI Config Keys
export const WIFI_CONFIG_SSID = 'ssid';
export const WIFI_CONFIG_PWD = 'wifiPwd';

// MQTT Config Keys
export const MQTT_CONFIG_SERVER = 'server';
export const MQTT_CONFIG_PORT = 'port';
export const MQTT_CONFIG_USER = 'user';
export const MQTT_CONFIG_PWD = 'mqttPwd';

// MQTT Payload Keys
export const PAYLOAD_DEVICE = 'device';
export const PAYLOAD_TOPIC = 'topic';
export const PAYLOAD_VALUE = 'value';

// MQTT Topics
export const TOPIC_DATA = 'Data';
export const TOPIC_FILTER_MEAN = 'Filter/Mean';
export const TOPIC_FILTER_MEDIAN = 'Filter/Median';
export const TOPIC_FILTER_EXP_SMOOTH = 'Filter/ExpSmooth';
