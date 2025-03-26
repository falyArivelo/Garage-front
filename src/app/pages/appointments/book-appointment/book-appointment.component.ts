import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleData } from 'src/app/components/list-vehicles/list-vehicles.component';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../appointment';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Datepicker module
import { MatInputModule } from '@angular/material/input'; // Input module pour date
import { MatNativeDateModule } from '@angular/material/core'; // Native date module
import { ServiceService } from 'src/app/services/service.service';
import { Service } from '../../services/service';

@Component({
  selector: 'app-book-appointment',
  imports: [MatListModule, MatCardModule, DatePipe, MatIconModule, MaterialModule, CommonModule, FormsModule, MatProgressBarModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss'
})

export class AppointmentAddComponent implements OnInit {
  // Liste fictive de services comme donnée statique
  // services = [
  //   {
  //     _id: "67cc26038819432e26e25651",
  //     name: "Réparation du moteur",
  //     description: "Réparation du moteur V8.",
  //     price: 180000,
  //     category: "Réparation",
  //     availability: true,
  //     image: null,
  //     createdAt: "2025-03-08T11:12:03.208Z",
  //     updatedAt: "2025-03-08T11:17:33.995Z",
  //     __v: 0
  //   },
  //   {
  //     _id: "67d6f68079c86915204b72df",
  //     name: "Vidange moteur",
  //     description: "Changement d’huile moteur et remplacement du filtre.",
  //     price: 80000,
  //     estimatedDuration: 60,
  //     availability: true,
  //     image: "https://example.com/images/vidange.jpg",
  //     createdAt: "2025-03-16T16:04:16.816Z",
  //     updatedAt: "2025-03-16T16:04:16.816Z",
  //     __v: 0
  //   }
  // ];

  services: Service[]  = []

  vehicles: VehicleData[] = []

  // Variable pour gérer les services sélectionnés
  selectedServices: any[] = [];
  selectedVehicle: VehicleData | null = null;
  selectedDate: Date;
  selectedTime: string = ''; // Format: "HH:mm"

  toISOStringWithTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result.toISOString();
  }
  isLoading = false;
  confirmationMessage: string = '';
  messageType: 'success' | 'error' = 'success';  // Initialisation par défaut à 'success'


  constructor(private vehicleService: VehicleService, private authService: AuthService, private appointmentService: AppointmentService,
            private serviceService: ServiceService, 
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
    this.loadServices()
  }

  onServiceSelect(service: any) {
    const index = this.selectedServices.findIndex(s => s._id === service._id);
    if (index > -1) {
      this.selectedServices.splice(index, 1);
    } else {
      this.selectedServices.push(service);
    }
  }

  isSelected(service: any) {
    return this.selectedServices.some(s => s._id === service._id);
  }

  selectVehicle(vehicle: VehicleData) {
    this.selectedVehicle = vehicle;
  }

  loadServices(): void {
    this.isLoading = true;
    this.serviceService.getAllServices().subscribe({
      next: (services: any[]) => {
        this.services = services;
        console.log(services)
      },
      error: () => {
        this.isLoading = false; // même en cas d'erreur, on arrête le chargement
      }
    });
  }

  loadVehicles(): void {
    this.vehicleService.getAllVehiclesMe().subscribe({
      next: (vehicles: VehicleData[]) => {
        this.vehicles = vehicles;
      },
      error: () => {
      }
    });
  }

  save() {
    this.isLoading = true;
    const user = this.authService.currentUserValue;
    const userId = user?.user_id ?? ''



    const appointment: any = {
      client: userId,
      vehicle: this.selectedVehicle ? this.selectedVehicle._id : '', // Assurez-vous d'obtenir l'ID du véhicule
      services: this.selectedServices.map(service => service._id), // Mappe les services sélectionnés pour obtenir les IDs
      status: 'En attente', // Initialement, l'appointment est en attente
      appointmentDate: this.selectedDate, // Assurez-vous que selectedDate est un objet Date
    };
    console.log(appointment)

    this.appointmentService.createAppointment(appointment).subscribe({
      next: (response) => {
        if (response.success) {
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


}
