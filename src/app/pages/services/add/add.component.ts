import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceData } from '../all/all.component';
import { PieceService } from 'src/app/services/piece.service';

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
      MatProgressBarModule,
      MatSnackBarModule,
      MatListModule
    ],
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss'
})

export class ServiceAddComponent {
  pieces: any[] = [];
  selectedPieces: any[] = [];  // Liste des pièces sélectionnées

  private defaultService: ServiceData = {
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
  service: ServiceData = { ...this.defaultService };
  isLoading = false
  
  constructor(
    private serviceService: ServiceService,
    private pieceService: PieceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { 
    // Recupere et Vérifie si l'état contient des pieces
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['pieces']) {
      this.pieces = navigation.extras.state['pieces'];
      console.log("Pièces reçues :", this.pieces);
    }
  }

  ngOnInit(): void {
    // Appel de la fonction pour charger les pièces
    this.loadPieces();
  }

  loadPieces(): void {
    this.pieceService.getAllPieces().subscribe((pieces: any[]) => {
      this.pieces = pieces;
    });
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

    this.service.pieces = this.selectedPieces; // Associer les pièces sélectionnées au service

    this.isLoading = true;
    
    this.serviceService.addService(this.service).subscribe({
        next: () => {
          this.selectedPieces = [];
          this.service = { ...this.defaultService }; // Réinitialisation propre
          this.snackBar.open("Service ajoutée avec succès !", "Fermer", { duration: 2000, verticalPosition: 'top', panelClass: 'alert-success' });
        },
        error: (err) => {
            console.error("Erreur lors de l'ajout :", err);
            const errorMessage = err.error?.message || "Une erreur inconnue est survenue.";
            this.snackBar.open(errorMessage, "Fermer", { duration: 8000, verticalPosition: 'top', panelClass: 'alert-error' });
        },
        complete: () => { this.isLoading = false; }
    });
  }

  cancel() {
    this.service = { ...this.defaultService };
    this.selectedPieces = []; // Réinitialiser explicitement la sélection
  }
}