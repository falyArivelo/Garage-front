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

export class PieceAddComponent {
    piece: PieceData = {
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
        private router: Router
      ) { }
    
      save() {
        this.isLoading = true;
        this.pieceService.createPiece(this.piece).subscribe({
          next: () => {
          },
          error: () => {
          }, complete: () => {
            this.isLoading = false;
          }
        });
      }
    
      cancel() {
        this.router.navigate(['/pieces/all']);
      }
    
}