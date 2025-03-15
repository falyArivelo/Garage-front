import { Component} from '@angular/core'; 
import { ServiceService } from '../../services/service.service';
import { PieceService } from '../../services/piece.service';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-services',
    imports: [CommonModule, FormsModule],
    templateUrl: './services-list.component.html',
    styleUrl: './services-list.component.css',
})

export class ServiceComponent{
    // Nouveau modèle pour le formulaire
    newService = { 
        name: '', 
        description: '', 
        price: 0, 
        estimatedDuration: 0, 
        category: '', 
        piece: []
    }
    services: any[] = []
    piecesList: any[] = []  // Stocke toutes les pièces disponibles

    constructor(private serviceService: ServiceService, private pieceService: PieceService) {}
    ngOnInit(): void {
        this.loadServices() 
        this.loadPieces(); // Charger les pièces disponibles
    }

    // Méthode pour récupérer et afficher tous les services
    loadServices(): void {
        this.serviceService
          .getServices() 
          .subscribe((data) => (this.services = data)) 
    }

    // Charger toutes les pièces disponibles
    loadPieces(): void {
        this.pieceService
           .getPieces()
           .subscribe((data) => (this.piecesList = data))
    }

    // Méthode pour ajouter un nouvel service
    addService(): void {
        if (this.newService.name && this.newService.price > 0 && this.newService.category && this.newService.piece.length > 0) {
        this.serviceService.addService(this.newService).subscribe(() => {
            this.loadServices()// Recharge la liste après ajout
            this.newService = { name: '', description: '', price: 0, estimatedDuration: 0, category: '', piece: []} // Réinitialise le formulaire
        })
        }
    }
}