import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ServiceAllComponent } from '../all/all.component';
import { ServiceService } from 'src/app/services/service.service'; 
import { PieceService } from 'src/app/services/piece.service';

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
  pieces : any[] = []

  constructor(private serviceService: ServiceService, private pieceService: PieceService, private router: Router) { }

  ngOnInit(): void {
    this.loadServices();
    this.loadPieces();
  }

  loadServices(): void {
    this.serviceService.getAllServices().subscribe((services: any[]) => {
      this.services = services;
    });
  }

  loadPieces(): void {
    this.pieceService.getAllPieces().subscribe((pieces: any[]) => {
      this.pieces = pieces;
    });
  }

  goToAddService() {
    this.router.navigate(['/services/add'], { state: { pieces: this.pieces } });
  }
}
