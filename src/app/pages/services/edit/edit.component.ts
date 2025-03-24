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
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PieceService } from 'src/app/services/piece.service';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceData } from '../all/all.component';

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
    MatProgressBarModule,
    MatListModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class ServiceEditComponent {
  pieces: any[] = [];
  selectedPieces: any[] = [];  // Liste des pièces sélectionnées

  service: ServiceData = {
    _id: '',
    name: '',
    category: 'Réparation',
    description: '',
    price: 0,
    estimatedDuration: 0,
    availability: true,
    pieces: [],
    image: '',
  };
  isLoading = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private serviceService: ServiceService,
    private pieceService: PieceService,
  ) {}

  // comparePieces(piece1: any, piece2: any): boolean {
  //   return piece1 && piece2 ? piece1._id === piece2._id : piece1 === piece2;
  // }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.serviceService.getServiceById(id).subscribe((data) => {
        console.log('Service récupéré :', data);
        this.service = data;
        this.selectedPieces = this.service.pieces; 
      });
    }
  }

  save() {
    // Vérification des champs obligatoires
    if (!this.service?.name || !this.service?.category) {
      this.snackBar.open("Veuillez remplir tous les champs !", "Fermer", { duration: 8000, verticalPosition: 'top', panelClass: 'alert-error' });
      return;
    }

    // Verification si Prix est pas negatif
    if (this.service.price <= 0) {
        this.snackBar.open("Veuillez entrer un prix valide !", "Fermer", { duration: 8000, verticalPosition: 'top', panelClass: 'alert-error' });
        return;
    }

    // Verification si duree estimation est pas negatif
    if (this.service.estimatedDuration <= 0){
      this.snackBar.open("Veuillez entrer une durée d'estimation valide !", "Fermer", { duration: 8000, verticalPosition: 'top', panelClass: 'alert-error' });
      return;
    }

    this.isLoading = true;
    // Associer uniquement les objets complets en fonction de la sélection
    this.service.pieces = this.selectedPieces.map(piece => ({
      _id: piece._id,  // On garde seulement l'ID pour l'API
      name: piece.name  // Optionnel, selon l'API
    }));

    this.serviceService.updateService(this.service).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open("Service modifier avec succès !", "Fermer", { duration: 8000, verticalPosition: 'top', panelClass: 'alert-success' });
      },
      error: () => {
        this.isLoading = false;
        // Gère l’erreur si besoin (snackbar, console, etc.)
      }
    });
  }

  cancel() {
    this.router.navigate(['/services/addButton']);
  }
}