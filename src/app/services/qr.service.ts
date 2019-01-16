import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  data$ = new ReplaySubject<any>(1);
  error$ = new ReplaySubject<string>(1);

  constructor() {}
}
