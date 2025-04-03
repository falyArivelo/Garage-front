import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppointmentData } from '../client-appointment/all/all.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { StatusService } from 'src/app/services/status.service';
import { CurrencyFormatPipe } from 'src/app/helpers/pipe/currencyFormat.pipe';
import { QuoteService } from 'src/app/services/quote.service';

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
        CurrencyFormatPipe
    ],
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})

export class AppointmentDetailByIdComponent {
    appointment: AppointmentData | null = null;
    hasQuote: boolean = false;
    isLoading = true;

    constructor(
        private appointmentService: AppointmentService, 
        private statusService: StatusService,
        private quoteService: QuoteService,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.appointmentService.getAppointmentById(id).subscribe((data) => {
                this.appointment = data;
                this.checkQuote(id);
                this.isLoading = false;
            });
        }
    }

    getStatusColor(status: string): string {
        return this.statusService.getStatusColor(status);
    }

    checkQuote(appointmentId: string) {
        this.quoteService.getQuoteByIdAppointment(appointmentId).subscribe({
            next: (quote) => {
                this.hasQuote = !!quote; // Vérifie que le devis existe
              },
              error: (error) => {
                console.log("Erreur lors de la récupération du devis :", error);
                this.hasQuote = false;
                this.cdr.detectChanges();
            }
        });
    }
}