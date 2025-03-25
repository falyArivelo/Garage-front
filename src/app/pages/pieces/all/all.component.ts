import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    styleUrl: './all.component.scss'
})

export class PieceAllComponent implements OnInit {
    displayedColumns: string[] = [];
    @Input() dataSource: any[] = [];
    user: any;
    isLoading = true;

    constructor(
        private pieceService: PieceService, 
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        if (!this.dataSource || this.dataSource.length === 0) {
            this.loadPieces();
            this.user = this.authService.currentUserValue;
            this.setDisplayedColumns();
            console.log("Utilisateur connecté :", this.user);
        } else {
            this.isLoading = false
        }
    }

    // Fonction pour configurer les colonnes selon le rôle de l'utilisateur
    setDisplayedColumns(): void {
        if (this.user?.role.includes('manager')) {
        // Si l'utilisateur est un manager
        this.displayedColumns = ['name', 'category', 'price', 'stock', 'menu'];
        } else if (this.user?.role.includes('mecanicien')) {
        // Si l'utilisateur est un mécanicien
        this.displayedColumns = ['name', 'category', 'price', 'stock'];
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
                this.snackBar.open("La pièce a bien été supprimée", "Fermer", { duration: 8000, verticalPosition: 'top', panelClass: 'alert-success' });
                this.dataSource = this.dataSource.filter(piece => piece_id !== piece_id);
                this.cdr.detectChanges();
                // Recharger les services depuis l'API
                this.loadPieces();
                this.router.navigate(['/pieces/addButton']);
            },
            error: (error) => {
                console.error('Erreur lors de la suppression:', error);
            }
        });
    }
}