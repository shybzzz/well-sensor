import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class SubscriptionService implements OnDestroy {
  private destroyed$ = new Subject();

  constructor() {}

  takeUntilDestroyed<T>(obs: Observable<T>): Observable<T> {
    return obs.pipe(takeUntil(this.destroyed$));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
