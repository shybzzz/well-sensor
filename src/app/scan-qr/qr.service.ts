import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  data$ = new Subject<any>();
  error$ = new Subject<{ message: any }>();

  constructor() {}
}
