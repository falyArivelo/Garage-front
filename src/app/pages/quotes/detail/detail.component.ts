import { ChangeDetectorRef, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { CurrencyFormatPipe } from 'src/app/helpers/pipe/currencyFormat.pipe';
import { QuoteService } from 'src/app/services/quote.service';
import { QuoteData } from '../all/all.component';

@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        TablerIconsModule,
        MatProgressBarModule,
        NgScrollbarModule,
        RouterModule,
        CurrencyFormatPipe,
    ],
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})

export class AppointmentDetailByIdComponent {
    @ViewChild('pdfButton') pdfButton: ElementRef | undefined;  // Référence au bouton
    isPDFView = false; // Initialement, le bouton est visible
    quote: QuoteData | null = null;
    hasQuote: boolean = false;
    today: Date;
    isLoading = true;

    constructor(
        private quoteService: QuoteService, 
        private route: ActivatedRoute,
    ) { 
        this.today = new Date();
    }

    ngOnInit(): void {
        const idAppointment = this.route.snapshot.paramMap.get('appointmentId');
        if (idAppointment) {
            this.quoteService.getQuoteByIdAppointment(idAppointment).subscribe({
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

    // Méthode pour générer le PDF
    generatePDF() {
        // Cacher le bouton avant de générer le PDF
        if (this.pdfButton) {
        this.pdfButton.nativeElement.style.display = 'none';
        }

        const element = document.getElementById('invoiceholder');
        if (element) {
        html2pdf()
            .from(element)
            .save('devis.pdf')
            .finally(() => {
            // Réafficher le bouton après la génération du PDF
            if (this.pdfButton) {
                this.pdfButton.nativeElement.style.display = 'block';
            }
            });
        }
    }   
    
    // Logique pour revenir à la vue normale
    backToNormalView() {
        this.isPDFView = false; 
    }
    
}