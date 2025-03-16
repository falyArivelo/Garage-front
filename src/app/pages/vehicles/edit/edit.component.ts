import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { VehicleData } from 'src/app/components/list-vehicles/list-vehicles.component';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class VehicleEditComponent {
  vehicle : VehicleData = {
    _id: '',
    owner : '',
    brand: '',
    model: '',
    year: 0,
    licensePlate: '',
    fuelType: 'Essence',
    mileage: 0,
    status: 'Actif',
    color: '',
  };
  isLoading = false;


  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vehicleService.getVehicleById(id).subscribe((data) => {
        this.vehicle = data;
      });
    }
  }

  save() {
    this.isLoading = true;
    this.vehicleService.updateVehicle(this.vehicle).subscribe({
      next: () => {
        this.isLoading = false;
        // this.router.navigate(['/vehicles/me']); // Tu peux le remettre ici si tu veux rediriger
      },
      error: () => {
        this.isLoading = false;
        // Gère l’erreur si besoin (snackbar, console, etc.)
      }
    });
  }

  cancel() {
    this.router.navigate(['/vehicles/me']);
  }
}
