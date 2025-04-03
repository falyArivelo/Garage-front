import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Rend le service accessible partout sans avoir besoin de l'ajouter dans un module
})
export class StatusService {
  getStatusColor(status: string): string {
    switch (status) {
      case 'Confirmé': return 'primary';
      case 'En cours': return 'warning';
      case 'En attente': return 'warning';
      case 'Terminé': return 'success';
      case 'Annulé': return 'error';
      default: return 'default';
    }
  }
}
