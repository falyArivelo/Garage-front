import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CurrencyFormatPipe } from 'src/app/helpers/pipe/currencyFormat.pipe';
import { ServiceService } from 'src/app/services/service.service';

export interface ServiceData {
    _id: string;
    name: string;
    category: 'Réparation' | 'Entretien' | 'Diagnostic';
    description: string;
    price: number;
    estimatedDuration: number;
    availability: true;
    pieces: any[];
    image: string;
}

@Component({
    selector: 'app-all',
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        TablerIconsModule,
        MatProgressBarModule,
        NgScrollbarModule,
        FormsModule,
        RouterModule,
        CurrencyFormatPipe
    ],
    templateUrl: './all.component.html',
    styleUrl: './all.component.scss'
})

export class ServiceAllComponent implements OnInit {
    displayedColumns: string[] = ['name', 'category', 'price', 'availability', 'menu'];
    @Input() dataSource: any[] = [];
    filteredDataSource: MatTableDataSource<any>;
    isLoading = true;

    constructor(
        private serviceService: ServiceService, 
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private router: Router,
    ) { }

    filterValues = {
        name: '',
        category: '',
        priceMin: null,
        priceMax: null
    };

    ngOnInit(): void {
        this.isLoading = true;

        // Vérifier si dataSource est défini et contient des données
        if (this.dataSource && this.dataSource.length > 0) {
            this.filteredDataSource = new MatTableDataSource(this.dataSource);
            this.applyFilter();  // Appliquer le filtre immédiatement si les données sont déjà présentes
            this.isLoading = false;
        } else {
            this.loadServices();  // Si dataSource est vide ou non défini, charger les services depuis l'API
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Si dataSource change, réinitialisez le filtre
        if (changes['dataSource']) {
          this.filteredDataSource.data = this.dataSource;
          this.applyFilter(); // Appliquez le filtre dès que les données changent
        }
    }

    loadServices(): void {
        this.isLoading = true;
        this.serviceService.getAllServices().subscribe({
            next: (services: any[]) => {
                this.dataSource = services;
                this.filteredDataSource = new MatTableDataSource(services);  // Initialisation correcte de filteredDataSource
                this.applyFilter();  // Appliquer le filtre après que les services aient été chargés
                this.isLoading = false;
                console.log(services)
            },
            error: () => {
                this.isLoading = false; // même en cas d'erreur, on arrête le chargement
            }
        });
    }

    // Appliquer le filtre
    applyFilter() {
        if (!this.dataSource || this.dataSource.length === 0) {
            return;  // Ne rien faire si dataSource est vide ou non défini
        }
    
        console.log('🔍 Filtres en cours:', this.filterValues);
    
        // Appliquer les filtres sur filteredDataSource
        this.filteredDataSource.data = this.dataSource.filter(service =>
            service.name.toLowerCase().includes(this.filterValues.name.toLowerCase()) &&
            (this.filterValues.category === '' || service.category === this.filterValues.category) &&
            (this.filterValues.priceMin == null || service.price >= this.filterValues.priceMin) &&
            (this.filterValues.priceMax == null || service.price <= this.filterValues.priceMax)
        );
    
        // Rafraîchir la table pour afficher les données filtrées
        this.cdr.detectChanges();

        console.log('📊 Nouvelle dataSource filtrée:', this.filteredDataSource.filteredData);
    }

    // Fonction de suppression avec confirmation
    confirmDelete(service_id: string): void {
        Swal.fire({
            title: 'êtes-vous sûrs?',
            text: 'Voulez-vous supprimer cette pièce?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmer la suppression',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteService(service_id);
            }
        });
    }

    // Logique pour supprimer la pièce
    deleteService(service_id: string): void {
        console.log(service_id);
        this.serviceService.deleteService(service_id).subscribe({
            next: (response) => {
                this.snackBar.open("Le service a bien été supprimé", "Fermer", { duration: 2000, verticalPosition: 'top', panelClass: 'alert-success' });
                this.dataSource = this.dataSource.filter(service => service_id !== service_id);
                this.filteredDataSource.data = this.dataSource; // Mettez à jour filteredDataSource
                this.cdr.detectChanges();
                // Recharger les services depuis l'API
                this.loadServices();
                this.router.navigate(['/services/addButton']);
            },
            error: (error) => {
                console.error('Erreur lors de la suppression:', error);
            }
        });
    }
}