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
        const pieceToSend = {
            ...this.newPiece,
            price: Number(this.newPiece.price),
            stock: Number(this.newPiece.stock),
            createDate: new Date(this.newPiece.createDate).toISOString().split('T')[0] // Format YYYY-MM-DD
        };
    
        // Vérifie si les champs sont bien remplis
        if (!pieceToSend.name || !pieceToSend.category || pieceToSend.price <= 0 || pieceToSend.stock < 0 || !pieceToSend.createDate) {
            alert("Veuillez remplir correctement tous les champs !");
            return;
        }
    
        this.pieceService.addPiece(pieceToSend).subscribe({
            next: () => {
                this.loadPieces(); // Recharge la liste après ajout
                this.newPiece = { 
                    name: '', 
                    category: '', 
                    description: '', 
                    price: 0, 
                    stock: 0, 
                    createDate: '' 
                };
                alert("Pièce ajoutée avec succès !");
            },
            error: (err) => {
                console.error("Erreur lors de l’ajout :", err);
                alert("Une erreur est survenue lors de l'ajout de la pièce.");
            }
        });
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
