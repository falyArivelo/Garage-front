import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'src/app/services/appointment.service'; // Si tu as ce service
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';  // Pour les boutons radio
import { MatButtonModule } from '@angular/material/button';  // Pour le bouton Confirmer
import { MatInputModule } from '@angular/material/input';  // Pour l'input du message
import { MatCardModule } from '@angular/material/card';  // Pour la carte
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss'],
  imports: [MatRadioModule, CommonModule, FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule]
})
export class ChangeStatusComponent implements OnInit {
  selectedStatus: string = ''; // Le statut sélectionné
  statusMessage: string = ''; // Le message pour le statut
  emailMessage: string = ''; // Message sélectionné pour l'email
  appointmentId: string;  // Variable pour stocker l'ID du rendez-vous
  clientEmail: any;

  constructor(private snackBar: MatSnackBar,
    private appointmentService: AppointmentService,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.paramMap.get('id')!;
    this.getclientEmail()
  }

  // Messages associés à chaque statut
  statusMessages: { [key: string]: string } = {
    'En attente': 'Votre rendez-vous est en attente.',
    'Confirmé': 'Votre rendez-vous à 9h a été confirmé. Veuillez ne pas être en retard.',
    'En cours': 'Votre rendez-vous est en cours.',
    'Terminé': 'Votre rendez-vous est terminé. Merci de votre visite.',
    'Annulé': 'Votre rendez-vous a été annulé.'
  };
  // Fonction pour mettre à jour le message en fonction du statut sélectionné
  onStatusChange() {
    this.statusMessage = this.statusMessages[this.selectedStatus] || '';
  }


  // Fonction de confirmation
  onConfirm() {
    if (!this.selectedStatus || !this.statusMessage) {
      this.snackBar.open('Veuillez sélectionner un statut et entrer un message.', 'Fermer', { duration: 10000 });
      return;
    }

    // Appeler l'API pour mettre à jour le rendez-vous
    const userId = this.authService.currentUserValue?.user_id ?? 'defaultUserId';
    this.appointmentService.changingStatusAppointmentByManager(this.appointmentId, this.selectedStatus, this.statusMessage, userId)
      .subscribe({
        next: (response) => {
          this.snackBar.open('Rendez-vous mis à jour avec succès.', 'Fermer', { duration: 3000 });
          this.sendEmail()
          // Votre logique de confirmation et envoi de mail
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la mise à jour du rendez-vous.', 'Fermer', { duration: 3000 });
        }
      });
  }

  // Fonction pour envoyer un mail (logique à ajouter)
  sendEmail() {
    this.emailService.sendEmail(this.clientEmail, this.selectedStatus, this.statusMessage)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Email envoyé avec succès !', 'Fermer', { duration: 3000 });
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.snackBar.open('Erreur lors de l\'envoi de l\'email', 'Fermer', { duration: 3000 });
        },
      });
  }

  getclientEmail() {
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (response) => {
        // Récupère l'email du client
        this.clientEmail = response.client.email;
        console.log('Email du client :', this.clientEmail);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du rendez-vous :', err);
      }
    });
  }

}
