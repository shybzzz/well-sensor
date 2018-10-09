export interface Device {
  id: string;
  ssid: string;
  ipAddress: string;
  mqtt?: { server: string; port: number; login: string; passwod: string };
}
