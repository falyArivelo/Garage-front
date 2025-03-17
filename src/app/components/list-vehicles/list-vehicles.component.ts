import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Input } from '@angular/core'; // à ajouter
import { RouterModule } from '@angular/router';  // Ajouter cette ligne
import Swal from 'sweetalert2';

export interface VehicleData {
  _id: string;
  owner: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color?: string;
  fuelType: 'Essence' | 'Diesel' | 'Électrique' | 'Hybride';
  mileage?: number;
  status: 'Actif' | 'En réparation' | 'Hors service';
  progress?: string;
}

@Component({
  selector: 'app-list-vehicles',
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
  templateUrl: './list-vehicles.component.html',
})
export class ListVehiclesComponent implements OnInit {
  displayedColumns: string[] = ['brand', 'model', 'year', 'licensePlate', 'fuelType', 'mileage', 'status', 'menu'];
  @Input() dataSource: VehicleData[] = [];
  isLoading = true;

  constructor(private vehicleService: VehicleService,  private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.dataSource || this.dataSource.length === 0) {
      this.loadVehicles();
    } else {
      this.isLoading = false
    }
  }

  loadVehicles(): void {
    this.isLoading = true;
    this.vehicleService.getAllVehiclesMe().subscribe({
      next: (vehicles: VehicleData[]) => {
        this.dataSource = vehicles;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false; // même en cas d'erreur, on arrête le chargement
      }
    });
  }

  // Fonction de suppression avec confirmation
  confirmDelete(vehicle_id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this vehicle?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteVehicle(vehicle_id);
      }
    });
  }

  // Logique pour supprimer le véhicule
  deleteVehicle(vehicle_id: string): void {
    console.log(vehicle_id);
    this.vehicleService.deleteVehicle(vehicle_id).subscribe({
      next: (response) => {
        console.log('Véhicule supprimé avec succès:', response);
        this.dataSource = this.dataSource.filter(vehicle => vehicle._id !== vehicle_id);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression:', error);
      }
    });
  }
}
