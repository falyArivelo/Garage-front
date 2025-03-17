export interface Appointment {
    _id: string; // ID de l'appointment
    client: string; // ID du client (référence à l'utilisateur)
    vehicle: string; // ID du véhicule (référence au modèle de véhicule)
    services: string[]; // Liste des IDs des services (références aux services)
    status: 'En attente' | 'Confirmé' | 'En cours' | 'Terminé' | 'Annulé'; // Statut de l'appointment
    appointmentDate: Date; // Date de l'appointment (en format ISO string)
    notes: Note[]; // Liste des notes ajoutées à l'appointment
    invoice?: string; // ID de la facture (référence à l'objet Invoice, optionnel)
    createdAt: Date; // Date de création de l'appointment
    updatedAt: Date; // Date de mise à jour de l'appointment
  }
  
  export interface Note {
    author: string; // ID de l'auteur de la note (référence à l'utilisateur)
    message: string; // Message de la note
    createdAt: string; // Date de création de la note
  }
  