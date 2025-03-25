import { Component, SimpleChanges } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyFormatPipe } from 'src/app/helpers/pipe/currencyFormat.pipe';
import { ServiceService } from 'src/app/services/service.service';

@Component({
    selector: 'app-allCard',
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        TablerIconsModule,
        MatProgressBarModule,
        NgScrollbarModule,
        RouterModule,
        FormsModule,
        CurrencyFormatPipe
    ],
    templateUrl: './allCard.component.html',
    styleUrls: ['./allCard.component.css'],
})

export class ServiceAllCardComponent {
    @Input() dataSource: any[] = [];
    filteredDataSource: MatTableDataSource<any>;
    isLoading = true;

    constructor(
        private serviceService: ServiceService, 
        private cdr: ChangeDetectorRef,
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
}