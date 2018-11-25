import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ConfigQr } from '../model/config-qr';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  data$ = new ReplaySubject<ConfigQr>(1);
  error$ = new ReplaySubject<{ message: any }>(1);

  constructor() {}
}
