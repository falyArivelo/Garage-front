import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { QuoteService } from 'src/app/services/quote.service';
import { QuoteData } from '../all/all.component';
import { PaymentPopupComponent } from './payment/payment-popup.component';

@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        FormsModule,
        TablerIconsModule,
        MatProgressBarModule,
        NgScrollbarModule,
        RouterModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        PaymentPopupComponent,
    ],
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})

export class QuoteEditComponent {
    isPaymentPopupOpen: boolean = false;  // Contrôle de l'ouverture du popup
    paymentUrl: string = 'https://www.example.com/payer';  // L'URL pour le paiement
    quote: QuoteData | null = null;
    idAppointment: string | null = null;
    today: Date;
    isLoading = true;

    constructor(
        private quoteService: QuoteService, 
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router,
    ) { 
        this.today = new Date();
    }

    ngOnInit(): void {
        console.log("ngOnInit appelé !");
        this.idAppointment = this.route.snapshot.paramMap.get('id');
        console.log("ID de rendez-vous :", this.idAppointment);
        if (this.idAppointment) {
            this.quoteService.getQuoteByIdAppointment(this.idAppointment).subscribe({
                next: (data) => {
                    console.log('Réponse du backend :', data);
                    this.quote = data;
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error('Erreur lors de la récupération du devis :', err);
                    this.isLoading = false;
                }
            });
        }
    }

    save() {
        this.isLoading = true;
        this.quoteService.updateQuote(this.quote).subscribe({
          next: () => {
            this.isLoading = false;
            this.snackBar.open("Vous pouvez procéder au paiement", "Fermer", { duration: 8000, verticalPosition: 'top', panelClass: 'alert-success' });
          },
          error: () => {
            this.isLoading = false;
          }
        });
    }

    cancel() {
        if (this.idAppointment) {
            this.router.navigate([`appointments/detailClient/${this.idAppointment}`]);
        } else {
            console.error("Impossible de naviguer : ID de rendez-vous introuvable.");
        }
    }

    // Ouvrir le popup de paiement
    openPaymentPopup() {
        this.isPaymentPopupOpen = true;
    }

    // Fermer le popup de paiement
    closePaymentPopup() {
        this.isPaymentPopupOpen = false;
    }
}