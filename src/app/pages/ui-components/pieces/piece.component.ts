import { Component} from '@angular/core';
import { PieceService } from 'src/app/services/piece.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 

@Component({
    selector: 'app-piece',
    imports: [CommonModule, FormsModule],
    templateUrl: './piece.component.html',
    styleUrl: './piece.component.css',
    standalone: true, // IMPORTANT : Rend le composant standalone
})
export class PieceComponent {
    // Nouveau modèle pour le formulaire
    newPiece = { 
        name: '', 
        category: '', 
        description: '',
        price: 0,
        stock: 0,
        createDate: '',
    } 
    pieces: any[] = []

    // Injection du service PieceService dans le constructeur pour interagir avec l'API
    constructor(private pieceService: PieceService) {}
    // Méthode exécutée automatiquement à l'initialisation du composant
    ngOnInit(): void {
        this.loadPieces() // Charge la liste des pieces au démarrage
    }
    // Méthode pour récupérer et afficher tous les pieces
    loadPieces(): void {
        this.pieceService
        .getPieces() //Appelle le service pour récupérer les pieces
        .subscribe((data) => (this.pieces = data)) // Met à jour la liste avec les données reçues
    }

    // Méthode pour ajouter un nouvel piece
    addPiece(): void {
        // Vérifie si le titre et le contenu ne sont pas vides
        if (this.newPiece.name && this.newPiece.category && this.newPiece.price > 0 && this.newPiece.stock >=0 && this.newPiece.createDate) {
            this.pieceService.addPiece(this.newPiece).subscribe(() => {
                this.loadPieces()
                // Recharge la liste après ajout
                this.newPiece = { 
                    name: '', 
                    category: '', 
                    description: '',
                    price: 0,
                    stock: 0,
                    createDate: '', 
                } // Réinitialise le formulaire
            })
        }
    }

    // Méthode pour mettre à jour une pièce
    updatePiece(id: string, updatedPiece: any): void {
        this.pieceService.updatePiece(id, updatedPiece).subscribe(() => this.loadPieces());
    }

    // Méthode pour supprimer un piece
    deletePiece(id: string): void {
        this.pieceService.deletePiece(id).subscribe(() => this.loadPieces())
    }
}
