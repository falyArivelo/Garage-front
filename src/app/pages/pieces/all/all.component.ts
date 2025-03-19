import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PieceService } from 'src/app/services/piece.service';

export interface PieceData {
    _id: string;
    name: string;
    category: 'Moteur' | 'Système de freinage' | 'Électrique et Électronique' | 'Échappement';
    description: string;
    price: number;
    stock: number;
}

@Component({
    selector: 'app-all',
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        TablerIconsModule,
        MatProgressBarModule,
        NgScrollbarModule,
        RouterModule
    ],
    templateUrl: './all.component.html',
})

export class PieceAllComponent implements OnInit {
    displayedColumns: string[] = ['name', 'category', 'price', 'stock', 'menu'];
    @Input() dataSource: any[] = [];
    isLoading = true;

    constructor(
        private pieceService: PieceService, 
        private cdr: ChangeDetectorRef,
        private router: Router,
    ) { }

    ngOnInit(): void {
        if (!this.dataSource || this.dataSource.length === 0) {
            this.loadPieces();
        } else {
            this.isLoading = false
        }
    }

    loadPieces(): void {
        this.isLoading = true;
        this.pieceService.getAllPieces().subscribe({
            next: (pieces: any[]) => {
                this.dataSource = pieces;
                this.isLoading = false;
                console.log(pieces)
            },
            error: () => {
                this.isLoading = false; // même en cas d'erreur, on arrête le chargement
            }
        });
    }

    // Fonction de suppression avec confirmation
    confirmDelete(piece_id: string): void {
        Swal.fire({
            title: 'êtes-vous sûrs?',
            text: 'Voulez-vous supprimer cette pièce?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-la!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                this.deletePiece(piece_id);
            }
        });
    }

    // Logique pour supprimer la pièce
    deletePiece(piece_id: string): void {
        console.log(piece_id);
        this.pieceService.deletePiece(piece_id).subscribe({
            next: (response) => {
                this.router.navigate(['/pieces/all']);
                console.log('Pièce supprimé avec succès:', response);
                this.dataSource = this.dataSource.filter(piece => piece_id !== piece_id);
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Erreur lors de la suppression:', error);
            }
        });
    }
}