import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core'; 
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import Swal from 'sweetalert2';
import { ServiceData } from 'src/app/pages/services/all/all.component'; 
import { AppointmentService } from 'src/app/services/appointment.service';

export interface AppointmentData {
    _id: string;
    client : any;
    vehicle: any;
    services: ServiceData[];
    status: 'En attente' | 'Confirmé' | 'En cours' | 'Terminé' | 'Annulé';
    appointmentDate: any;
    notes: any[];
    invoice: any;
}

@Component({
    selector: 'app-allClient',
    standalone: true,
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        TablerIconsModule,
        MatProgressBarModule,
        MatDatepickerModule, // Correct pour le Datepicker
        MatNativeDateModule, // IMPORTANT pour MatDatepicker
        NgScrollbarModule,
        RouterModule,
        FormsModule,
    ],
    templateUrl: './all.component.html',
    styleUrl: './all.component.scss'
})

export class AppointmentClientAllComponent implements OnInit {
    displayedColumns: string[] = ['vehicle', 'services', 'appointmentDate', 'status', 'menu'];
    @Input() dataSource: any[] = [];
    filteredDataSource: MatTableDataSource<any> = new MatTableDataSource();
    pagedData: any[] = []; // Variable pour stocker les données paginées
    currentPage = 0; // Page courante
    pageSize = 5; // Nombre d'éléments par page
    totalPages: number = 0; // Total des pages
    isLoading = true;

    constructor(
        private appointmentService: AppointmentService,
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    filterValues = {
        vehicle: '',
        services: '',
        dateMin: null, 
        dateMax: null,
        status: '',
    };

    ngOnInit(): void {
        if (this.dataSource && this.dataSource.length > 0) {
            console.log('Données initiales:', this.dataSource);
            this.filteredDataSource = new MatTableDataSource(this.dataSource);
            this.applyFilter();  // Appliquer le filtre immédiatement si les données sont déjà présentes
            this.isLoading = false;
        } else {
            this.loadAppointment(); // Si dataSource est vide ou non défini, charger les services depuis l'API
        }
    }

     ngOnChanges(changes: SimpleChanges): void {
        // Si dataSource change, réinitialisez le filtre
        if (changes['dataSource'] && this.dataSource) {
            console.log('Données après changement:', this.dataSource); 
            this.filteredDataSource.data = this.dataSource;
            this.applyFilter(); // Appliquez le filtre dès que les données changent
        }
    }

    loadAppointment(): void {
        this.isLoading = true;
        console.log('Chargement des rendez-vous...');
        this.appointmentService.getAppointmentsByClient().subscribe({
            next: (appointments: any[]) => {
                console.log('Données reçues:', appointments); 
                this.dataSource = appointments;
                this.filteredDataSource = new MatTableDataSource(appointments);  // Initialisation correcte de filteredDataSource
                this.applyFilter();  // Appliquer le filtre après que les services aient été chargés
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Erreur lors du chargement des rendez-vous:', err); 
                this.isLoading = false; // même en cas d'erreur, on arrête le chargement
            }
        });
    }

    // Appliquer le filtre
    applyFilter() {
        if (!this.dataSource || this.dataSource.length === 0) {
            console.log('Aucune donnée disponible pour filtrer');
            return;  // Ne rien faire si dataSource est vide ou non défini
        }
    
        console.log('Données avant filtre:', this.dataSource);
    
        const filtered = this.dataSource.filter(appointment => {
            // Vérification si vehicle existe et si vehicle.brand existe
            const vehicleBrand = appointment.vehicle && appointment.vehicle.brand ? appointment.vehicle.brand.trim().toLowerCase() : '';
            console.log(`Véhicule: "${vehicleBrand}", Recherche: "${this.filterValues.vehicle.trim().toLowerCase()}"`);

            // Filtrage du véhicule si 'vehicle' est défini et le filtre est non vide
            const vehicleMatches = vehicleBrand.includes(this.filterValues.vehicle.toLowerCase()) || !this.filterValues.vehicle;
            console.log(`Filtre véhicule: ${vehicleMatches}`);

            // Vérification des services uniquement si services existe et est un tableau
            let servicesMatch = true;
            if (Array.isArray(appointment.services)) {
                servicesMatch = appointment.services.some((service: ServiceData) => 
                    service.name && service.name.toLowerCase().includes(this.filterValues.services.trim().toLowerCase())
                );
            }
    
            // Vérification des dates min et max
            const dateMatches = (this.filterValues.dateMin == null || new Date(appointment.appointmentDate).setHours(0, 0, 0, 0) >= new Date(this.filterValues.dateMin).setHours(0, 0, 0, 0)) &&
                (this.filterValues.dateMax == null || new Date(appointment.appointmentDate).setHours(0, 0, 0, 0) <= new Date(this.filterValues.dateMax).setHours(0, 0, 0, 0));
    
            // Filtrage du statut
            const statusMatches = this.filterValues.status === '' || appointment.status === this.filterValues.status;
            console.log(`Filtre statut: ${statusMatches}`);

            // Retourner true si toutes les conditions sont remplies
            return vehicleMatches && servicesMatch && dateMatches && statusMatches;
        });
    
        console.log('🔍 Données filtrées:', filtered); // Vérifiez les résultats du filtrage
    
        // Mise à jour de filteredDataSource
        this.filteredDataSource.data = filtered;
         // Réinitialiser la page courante si les résultats filtrés changent
        this.currentPage = 0;
        this.totalPages = Math.ceil(this.filteredDataSource.data.length / this.pageSize); // Calculer le nombre de pages total
        this.updatePagedData();
        this.cdr.detectChanges();
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
        this.appointmentService.cancelAppointment(appointment_id).subscribe({
            next: (response) => {
                this.snackBar.open("Votre rendez-vous a été annulé", "Fermer", { duration: 2000, verticalPosition: 'top', panelClass: 'alert-success' });
                // this.dataSource = this.dataSource.filter(appointment => appointment._id !== appointment_id);
                // this.cdr.detectChanges();
                this.loadAppointment();
            },
            error: (error) => {
                console.error('Erreur lors de la suppression:', error);
            }, complete : () => {
                this.loadAppointment();
            }

        });
    }

    updatePagedData() {
        // Assurez-vous que filteredDataSource contient les données filtrées
        const startIndex = this.currentPage * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedData = this.filteredDataSource.data.slice(startIndex, endIndex); // Utiliser pagedData ici
    }

    // Passer à la page suivante
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.updatePagedData();
        }
    }

    // Passer à la page précédente
    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updatePagedData();
        }
    }

    // Aller à une page spécifique
    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page - 1;
            this.updatePagedData();
        }
    }

    // Obtenir les numéros de page à afficher pour la pagination
    getPageNumbers() {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
}