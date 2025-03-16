import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-book-appointment',
  imports: [MatListModule, MatCardModule, DatePipe,MatIconModule, MaterialModule,CommonModule ],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss'
})

export class AppointmentAddComponent {
  // Liste fictive de services comme donnée statique
  services = [
    {
      _id: "67cc26038819432e26e25651",
      name: "Réparation du moteur",
      description: "Réparation du moteur V8.",
      price: 180000,
      category: "Réparation",
      availability: true,
      image: null,
      createdAt: "2025-03-08T11:12:03.208Z",
      updatedAt: "2025-03-08T11:17:33.995Z",
      __v: 0
    },
    {
      _id: "67d6f68079c86915204b72df",
      name: "Vidange moteur",
      description: "Changement d’huile moteur et remplacement du filtre.",
      price: 80000,
      estimatedDuration: 60,
      availability: true,
      image: "https://example.com/images/vidange.jpg",
      createdAt: "2025-03-16T16:04:16.816Z",
      updatedAt: "2025-03-16T16:04:16.816Z",
      __v: 0
    }
  ];

    // Variable pour gérer les services sélectionnés
    selectedServices: any[] = [];

    onServiceSelect(service : any) {
      const index = this.selectedServices.findIndex(s => s._id === service._id);
      if (index > -1) {
        this.selectedServices.splice(index, 1);
      } else {
        this.selectedServices.push(service);
      }
    }
  
    isSelected(service : any) {
      return this.selectedServices.some(s => s._id === service._id);
    }

}
