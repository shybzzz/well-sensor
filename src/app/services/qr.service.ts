import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { QrConfig } from '../model/qr-config';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  data$ = new Subject<QrConfig>();
  error$ = new Subject<{ message: any }>();

  constructor() {}
}
