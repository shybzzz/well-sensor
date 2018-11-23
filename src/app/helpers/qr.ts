function generateQr(
  deviceId,
  apSSID,
  apIP,
  appPwd,
  mqttServer,
  mqttPort,
  mqttUser,
  mqttPwd
) {
  const qrData = {};
  qrData['deviceId'] = deviceId;
  qrData['apSSID'] = apSSID;
  qrData['apIP'] = apIP;
  qrData['appPwd'] = appPwd;
  qrData['mqttServer'] = mqttServer;
  qrData['mqttPort'] = mqttPort;
  qrData['mqttUser'] = mqttUser;
  qrData['mqttPwd'] = mqttPwd;
  return qrData;
}
