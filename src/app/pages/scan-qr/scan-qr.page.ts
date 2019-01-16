import { Component, OnInit, OnDestroy } from '@angular/core';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { QrService } from '../../services/qr.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
  providers: []
})
export class ScanQrPage implements OnInit, OnDestroy {
  constructor(
    public location: Location,
    private qrScanner: QRScanner,
    private qrService: QrService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.scanQr();
  }

  ngOnDestroy() {
    // this.qrScanner.destroy();
  }

  async scanQr(): Promise<any> {
    const qr = this.qrService;
    try {
      const qrScanner = this.qrScanner;
      const qrStatus = await qrScanner.prepare();
      if (qrStatus.authorized) {
        const scanSub = qrScanner.scan().subscribe((text: string) => {
          try {
            const data = JSON.parse(text);
            qr.data$.next(data);
          } catch (err) {
            this.handleError('QR is invalid');
          }

          qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
          this.location.back();
        });
        await qrScanner.show();
      } else {
        this.handleError('Camera Access is denied');
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err: string) {
    this.qrService.error$.next(err);
  }
}
