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
    styleUrls: ['./allCard.component.scss'],
})

export class ServiceAllCardComponent {
    @Input() dataSource: any[] = [];
    filteredDataSource: MatTableDataSource<any>;
    pagedData: any[] = []; // Variable pour stocker les données paginées
    currentPage = 0; // Page courante
    pageSize = 3; // Nombre d'éléments par page
    totalPages: number = 0; // Total des pages
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
     
        const filtered = this.dataSource.filter(service =>
            service.name.toLowerCase().includes(this.filterValues.name.toLowerCase()) &&
            (this.filterValues.category === '' || service.category === this.filterValues.category) &&
            (this.filterValues.priceMin == null || service.price >= this.filterValues.priceMin) &&
            (this.filterValues.priceMax == null || service.price <= this.filterValues.priceMax)
        );
        
        console.log('🔍 Données filtrées:', filtered); // Ajout d'un log pour vérifier les données filtrées
    
        this.filteredDataSource.data = filtered;
        this.totalPages = Math.ceil(this.filteredDataSource.data.length / this.pageSize);
        this.updatePagedData();
        this.cdr.detectChanges();
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