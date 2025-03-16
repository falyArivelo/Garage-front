import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ListVehiclesComponent, VehicleData } from 'src/app/components/list-vehicles/list-vehicles.component';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-me',
  imports: [
    ListVehiclesComponent,
    MatButtonModule,
  ],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss'
})
export class VehiclesMeComponent implements OnInit {

  myVehicles: VehicleData[] = []

  constructor(private vehicleService: VehicleService,private router: Router) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getAllVehiclesMe().subscribe((vehicles: VehicleData[]) => {
      this.myVehicles = vehicles;
    });
  }

  goToAddVehicle() {
    this.router.navigate(['/vehicles/add']);
  }
}
