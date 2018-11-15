export const SET_WIFI_CONFIG_REQUEST_HEADER = '1';
export const GET_IP_REQUEST_HEADER = '1';

export const INVALID_WIFI_CONFIG_RESPONSE_HEADER = '1';
export const WIFI_CONNECTION_FAILED_RESPONSE_HEADER = '2';

export const WIFI_CONFIG_SSID = 'ssid';
export const WIFI_CONFIG_PWD = 'pwd';

export const errorMessages = {};
errorMessages[INVALID_WIFI_CONFIG_RESPONSE_HEADER] = 'Error. Invalid wifiConfig is received';
errorMessages[WIFI_CONNECTION_FAILED_RESPONSE_HEADER] = 'Error. Could not connect to wifi with wifiConfig provided';


