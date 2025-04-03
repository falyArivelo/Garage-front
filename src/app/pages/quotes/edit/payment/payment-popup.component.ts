import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-payment-popup',
  imports: [CommonModule],
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.scss']
})
export class PaymentPopupComponent {
  @Input() qrData: string = '';  // Données du QR Code
  @Output() closePopup = new EventEmitter<void>();  // Evénement de fermeture du popup

  qrCodeUrl: string = '';  // URL du QR Code

  ngOnInit() {
    // Générer l'URL du QR Code
    this.generateQRCode();
  }

  // Fonction pour générer le QR Code
  generateQRCode() {
    QRCode.toDataURL(this.qrData, (err, url) => {
      if (err) {
        console.error('Erreur lors de la génération du QR Code', err);
      } else {
        this.qrCodeUrl = url;
      }
    });
  }

  // Fermer le popup
  close() {
    this.closePopup.emit();
  }
}
