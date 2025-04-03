import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PieceAllComponent } from '../all/all.component';
import { PieceService } from 'src/app/services/piece.service'; 

@Component({
  selector: 'app-addButton',
  imports: [
    PieceAllComponent,
    MatButtonModule,
  ],
  templateUrl: './addButton.component.html',
  styleUrl: './addButton.component.scss'
})
export class PieceAddButtonComponent implements OnInit {

  pieces : any[] = []

  constructor(private pieceService: PieceService,private router: Router) { }

  ngOnInit(): void {
    this.loadPieces();
  }

  loadPieces(): void {
    this.pieceService.getAllPieces().subscribe((pieces: any[]) => {
      this.pieces = pieces;
    });
  }

  goToAddPiece() {
    this.router.navigate(['/pieces/add']);
  }
}
