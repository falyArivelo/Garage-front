import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ServiceAllComponent } from '../all/all.component';
import { ServiceService } from 'src/app/services/service.service'; 

@Component({
  selector: 'app-addButton',
  imports: [
    ServiceAllComponent,
    MatButtonModule,
  ],
  templateUrl: './addButton.component.html',
  styleUrl: './addButton.component.scss'
})
export class ServiceAddButtonComponent implements OnInit {
  services : any[] = []

  constructor(private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getAllServices().subscribe((services: any[]) => {
      this.services = services;
    });
  }

  goToAddService() {
    this.router.navigate(['/services/add']);
  }
}
