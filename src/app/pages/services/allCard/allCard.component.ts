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
        RouterModule
    ],
    templateUrl: './allCard.component.html',
    styleUrls: ['./allCard.component.css']
})

export class ServiceAllCardComponent {
    @Input() dataSource: any[] = [];
    isLoading = true;

    constructor(
        private serviceService: ServiceService, 
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
}