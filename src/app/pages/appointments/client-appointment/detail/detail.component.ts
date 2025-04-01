import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentData } from '../all/all.component';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
    selector: 'app-detailClient',
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
    ],
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})

export class AppointmentDetailByClientComponent {
    appointment: AppointmentData | null = null;
    isLoading = true;

    constructor(
        private appointmentService: AppointmentService, 
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id'); // Récupérer l'ID du rendez-vous depuis l'URL
            if (id) {
                this.appointmentService.getAppointmentsByClient().subscribe((data) => {
                    console.log('Données reçues:', data);
                    this.appointment = data.find(app => app._id === id) || null; // Chercher le rendez-vous correspondant
                    if (!this.appointment) {
                        console.error("Aucun rendez-vous trouvé avec cet ID");
                    }
                    this.isLoading = false;
                }, error => {
                    console.error("Erreur lors de la récupération des rendez-vous:", error);
                    this.isLoading = false;
                });
            } else {
                console.error("ID du rendez-vous non trouvé dans l'URL");
                this.isLoading = false; // Gérer le cas où l'ID est absent
            }
        });
    }
        
}