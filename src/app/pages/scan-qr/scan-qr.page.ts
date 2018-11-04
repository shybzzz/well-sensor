import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { QrService } from '../../services/qr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss']
})
export class ScanQrPage implements OnInit, OnDestroy {
  constructor(
    private platform: Platform,
    private qrScanner: QRScanner,
    private qr: QrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.scanQr();
    });
  }

  ngOnDestroy() {
    this.qrScanner.destroy();
  }

  async scanQr() {
    const qr = this.qr;
    try {
      const qrStatus = await this.qrScanner.prepare();
      if (qrStatus.authorized) {
        const scanSub = this.qrScanner.scan().subscribe(
          (text: string) => {
            try {
              qr.data$.next(JSON.parse(text));
              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
            } catch (err) {
              this.handleError('QR is not valid');
            }
          },
          err => {
            this.handleError(err);
          }
        );
        this.qrScanner.show();
      } else {
        this.handleError('Could not access QR Scanner');
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(message: any) {
    this.qr.error$.next({ message: message });
    this.router.navigate(['/add-device']);
  }
}
