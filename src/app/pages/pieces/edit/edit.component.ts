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
import { MatSnackBar } from '@angular/material/snack-bar';
import { PieceService } from 'src/app/services/piece.service';
import { PieceData } from '../all/all.component';

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
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class PieceEditComponent {
  piece: PieceData = {
    _id: '',
    name: '',
    category: 'Moteur',
    description: '',
    price: 0,
    stock: 0,
  };
  isLoading = false;


  constructor(
    private route: ActivatedRoute,
    private pieceService: PieceService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pieceService.getPieceById(id).subscribe((data) => {
        this.piece = data;
      });
    }
  }

  save() {
    this.isLoading = true;
    this.pieceService.updatePiece(this.piece).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open("Pièce modifier avec succès !", "Fermer", { duration: 8000, verticalPosition: 'top', panelClass: 'alert-success' });
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/pieces/addButton']);
  }
}
