import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { QrConfig } from '../model/qr-config';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  data$ = new ReplaySubject<QrConfig>(1);
  error$ = new ReplaySubject<{ message: any }>(1);

  constructor() {}
}
