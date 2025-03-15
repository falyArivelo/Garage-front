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
    selectedService: any = null; // Service sélectionné pour modification
    piecesList: any[] = []  // Stocke toutes les pièces disponibles
    selectedPieces: string[] = []; // Liste des ID des pièces sélectionnées

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

    // Méthode pour supprimer un service
    deleteService(id: string): void {
        this.serviceService.deleteService(id).subscribe(() => this.loadServices());
    }

    // Sélectionner un service à modifier et préremplir les pièces associées
    selectService(service: any): void {
        this.selectedService = { ...service }; // Copier l'objet service
        this.selectedPieces = service.pieces.map((piece: any) => piece._id); // Extraire les IDs des pièces associées
    }
    // Mettre à jour le service sélectionné avec les nouvelles pièces
    updateService(): void {
        if (this.selectedService) {
            this.selectedService.pieces = this.selectedPieces; // Associer les pièces sélectionnées

            this.serviceService.updateService(this.selectedService._id, this.selectedService)
                .subscribe(() => {
                    this.loadServices(); // Recharger la liste des services après mise à jour
                    this.selectedService = null; // Réinitialiser le formulaire
                    this.selectedPieces = []; // Réinitialiser les pièces sélectionnées
                });
        }
    }
}