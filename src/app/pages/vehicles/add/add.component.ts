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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
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
    MatProgressBarModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class VehicleAddComponent {
  vehicle: VehicleData = {
    _id: '',
    owner: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    fuelType: 'Essence',
    status: 'Actif',
    color: '',
    mileage: 0,
  };

  isLoading = false
  confirmationMessage: string = '';
  messageType: 'success' | 'error' = 'success';  // Initialisation par défaut à 'success'

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  save() {
    this.isLoading = true;
    this.vehicleService.saveVehicle(this.vehicle).subscribe({
      next: (response) => {
        if(response.success){
          this.confirmationMessage = response.message
          this.messageType = 'success';  
        }
      },
      error: (error) => {
        this.confirmationMessage = error.message
        this.messageType = 'error';  
      }, complete: () => {
        
        this.isLoading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/vehicles/me']);
  }

}
