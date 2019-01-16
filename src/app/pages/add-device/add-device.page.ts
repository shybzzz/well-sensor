import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { QrService } from '../../services/qr.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss']
})
export class AddDevicePage implements OnInit, OnDestroy {
  error;
  success;
  destroy$ = new Subject();
  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
  }

  scanQr() {
    this.success = null;
    this.error = null;
    this.router.navigate(['/scan-qr']);
  }
}
