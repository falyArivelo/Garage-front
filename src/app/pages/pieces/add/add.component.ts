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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PieceService } from 'src/app/services/piece.service';
import { PieceData } from '../all/all.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    ],
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss'
})

export class PieceAddComponent {
  piece : PieceData = {
      _id: '',
      name: '',
      category: 'Moteur',
      description: '',
      price: 0,
      stock: 0,
  };
  isLoading = false
  
  constructor(
    private pieceService: PieceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  save() {
    // Vérification des champs obligatoires
    if (!this.piece?.name || !this.piece?.category) {
        this.snackBar.open("Veuillez remplir tous les champs !", "Fermer", { duration: 8000, panelClass: 'alert-error' });
        return;
    }

    if (this.piece.price <= 0 || this.piece.stock < 0) {
        this.snackBar.open("Veuillez entrer un prix et un stock valides !", "Fermer", { duration: 8000, panelClass: 'alert-error' });
        return;
    }

    this.isLoading = true;
    
    this.pieceService.createPiece(this.piece).subscribe({
        next: () => {
          this.piece = { 
            _id: '',
            name: '',
            category: 'Moteur',
            description: '',
            price: 0,
            stock: 0, 
          };
          this.snackBar.open("Pièce ajoutée avec succès !", "Fermer", { duration: 2000, panelClass: 'alert-success' });
        },
        error: (err) => {
            console.error("Erreur lors de l'ajout :", err);
            const errorMessage = err.error?.message || "Une erreur inconnue est survenue.";
            this.snackBar.open(errorMessage, "Fermer", { duration: 8000, panelClass: 'alert-error' });
        },
        complete: () => { this.isLoading = false; }
    });
  }

  cancel() {
    this.piece = { 
      _id: '',
      name: '',
      category: 'Moteur',
      description: '',
      price: 0,
      stock: 0, 
    }; // Réinitialisation propre
  }
}