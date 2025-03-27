import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { VehicleService } from 'src/app/services/vehicle.service';

export interface AppointmentData {
    _id: string;
    vehicle: any;
    services: any[];
    status: 'En attente' | 'Confirmé' | 'En cours' | 'Terminé' | 'Annulé';
    appointmentDate: Date;
    estimatedDuration: number;
    notes: any[];
    invoice: any;
}

@Component({
    selector: 'app-allClient',
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        TablerIconsModule,
        MatProgressBarModule,
        NgScrollbarModule,
        RouterModule
    ],
    templateUrl: './all.component.html',
    styleUrl: './all.component.scss'
})

export class AppointmentClientAllComponent implements OnInit {
    displayedColumns: string[] = ['vehicle', 'appointmentDate', 'status', 'menu'];
    @Input() dataSource: any[] = [];
    isLoading = true;

    constructor(
        private appointmentService: AppointmentService,
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        if (!this.dataSource || this.dataSource.length === 0) {
            this.loadAppointment();
        } else {
            this.isLoading = false
        }
    }

    loadAppointment(): void {
        this.isLoading = true;
        this.appointmentService.getAppointmentsByClient().subscribe({
            next: (appointments: any[]) => {
                this.dataSource = appointments;
                this.isLoading = false;
                console.log(appointments)
            },
            error: () => {
                this.isLoading = false; // même en cas d'erreur, on arrête le chargement
            }
        });
    }

    // Fonction de suppression avec confirmation
    confirmDelete(appointment_id: string): void {
        Swal.fire({
            title: 'êtes-vous sûrs?',
            text: 'Voulez-vous supprimer ce rendez-vous?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmer l annulation du rendez-vous ?',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteAppointment(appointment_id);
            }
        });
    }

    // Logique pour supprimer la pièce
    deleteAppointment(appointment_id: string): void {
        console.log(appointment_id);
        this.appointmentService.deleteAppointment(appointment_id).subscribe({
            next: (response) => {
                this.snackBar.open("Votre rendez-vous a été annulé", "Fermer", { duration: 2000, verticalPosition: 'top', panelClass: 'alert-success' });
                this.dataSource = this.dataSource.filter(appointment => appointment_id !== appointment_id);
                this.cdr.detectChanges();
                this.loadAppointment();
                this.router.navigate(['/appointment/allClient']);
            },
            error: (error) => {
                console.error('Erreur lors de la suppression:', error);
            }
        });
    }
}