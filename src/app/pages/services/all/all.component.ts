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
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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
        RouterModule
    ],
    templateUrl: './all.component.html',
})

export class ServiceAllComponent implements OnInit {
    displayedColumns: string[] = ['name', 'category', 'price', 'availability', 'menu'];
    @Input() dataSource: any[] = [];
    isLoading = true;

    constructor(
        private serviceService: ServiceService, 
        private cdr: ChangeDetectorRef,
        private router: Router,
    ) { }

    ngOnInit(): void {
        if (!this.dataSource || this.dataSource.length === 0) {
            this.loadServices();
        } else {
            this.isLoading = false
        }
    }

    loadServices(): void {
        this.isLoading = true;
        this.serviceService.getAllServices().subscribe({
            next: (services: any[]) => {
                this.dataSource = services;
                this.isLoading = false;
                console.log(services)
            },
            error: () => {
                this.isLoading = false; // même en cas d'erreur, on arrête le chargement
            }
        });
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
            confirmButtonText: 'Oui, supprimez-la!',
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
                this.router.navigate(['/services/all']);
                console.log('Pièce supprimé avec succès:', response);
                this.dataSource = this.dataSource.filter(service => service_id !== service_id);
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Erreur lors de la suppression:', error);
            }
        });
    }
}