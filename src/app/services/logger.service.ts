import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logs: { color: string; message: string }[];

  constructor() {}

  log(message: string | object) {
    this.addLog('secondary', message);
  }

  error(message: string) {
    this.addLog('danger', message);
  }

  clear() {
    this.logs = [];
  }

  private addLog(color: string, message: string | object) {
    this.logs = [
      {
        color: color,
        message: typeof message === 'string' ? message : JSON.stringify(message)
      },
      ...this.logs
    ];
  }
}
