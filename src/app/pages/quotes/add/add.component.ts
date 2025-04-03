import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { QuoteService } from 'src/app/services/quote.service';
import { EmailService } from 'src/app/services/email.service';
import { EmailDialogComponent } from './email/email-dialog.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentData } from '../../appointments/client-appointment/all/all.component';
import { QuoteData } from '../all/all.component';

@Component({
  selector: 'app-add',
  standalone: true, // Déclare ce composant comme standalone
  imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        EditorModule, // Ajout du module TinyMCE
        MatFormFieldModule, // Pour mat-label et mat-form-field
        MatInputModule, 
      ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class QuoteAddComponent {
  clientEmail: any;

  appointment: AppointmentData = {
      _id: '',
      client: '',
      vehicle: '',
      services: [],
      status: 'En attente',
      appointmentDate: 0,
      notes: [],
      invoice: '',
  };

  quote: QuoteData = {
    _id: '',
    appointment: '',
    frais: 0,
    total: 0,
    status: 'En attente',
    validUntil: new Date(),
  };
  originalQuote: QuoteData | null = null;
  originalAppointment: AppointmentData | null = null;
  isLoading = false

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private emailService: EmailService,
    private quoteService: QuoteService,
    private appointmentService: AppointmentService, 
  ) {}
  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const appointmentId = params.get('appointmentId'); // Récupération de l'ID du rendez-vous
  
      console.log('appointmentId:', appointmentId);
  
      if (appointmentId) {
        this.quote.appointment = appointmentId; // Affecter l'ID dans la quote
        this.loadAppointment(appointmentId);
      }
    });
  }
  

  loadAppointment(appointmentId: string){
    this.isLoading = true;
    this.appointmentService.getAppointmentById(appointmentId).subscribe({
      next: (data) => {
        this.appointment = { ...data };
        this.originalAppointment = { ...data };

        // Vérifier si l'email du client est disponible
        if (data.client && data.client.email) {
          this.clientEmail = data.client.email;
        }

        this.quote = {
          _id: '',
          appointment: data._id,
          frais: 0,
          total: 0,
          status: 'En attente',
          validUntil: new Date(),
        };
        this.originalQuote = { ...this.quote };
      },
      error: (err) => {
        console.error('Erreur lors du chargement du rendez-vous:', err);
      },
      complete: () => {
        this.isLoading = false; // Toujours mettre isLoading à false à la fin
      }
    });
  }  

  calculateTotal(): number {
    if (!this.appointment || !this.appointment.services) {
      return 0;
    }
  
    // Calcule la somme des prix des services
    const serviceTotal = this.appointment.services.reduce((sum, service) => sum + (service.price || 0), 0);
  
    return serviceTotal + this.quote.frais; // Additionne les frais
  }

  save() {
    this.isLoading = true;
    // Recalcule le total avec les prix mis à jour
    this.quote.total = this.calculateTotal();
    this.quoteService.createQuote(this.quote).subscribe({
        next: () => {
          this.snackBar.open("Service ajoutée avec succès !", "Fermer", { duration: 2000, verticalPosition: 'top', panelClass: 'alert-success' });
            this.isLoading = false;
        },
        error: (err) => {
            console.error("Erreur lors de l'ajout :", err);
            const errorMessage = err.error?.message || "Une erreur inconnue est survenue.";
            this.isLoading = false;
        }
    });
  }

  
  openEmailDialog() {
    const dialogRef = this.dialog.open(EmailDialogComponent, {
      width: '500px',
      data: { clientEmail: this.clientEmail }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendEmail(result.to, result.subject, result.text);
      }
    });
  }

  // Fonction pour envoyer un mail (logique à ajouter)
  sendEmail(to: string, subject: string, message: string) {
    this.snackBar.open('Email en cours d\'envoi...', 'Fermer', { verticalPosition: 'top', duration: 2000, panelClass: 'alert-success' });
    if (!to) {
      this.snackBar.open('Adresse email invalide.', 'Fermer', {  verticalPosition: 'top', duration: 3000, panelClass: 'alert-error' });
      return;
    }

    this.emailService.sendEmail(to, subject, message)
      .subscribe({
        next: () => {
          this.snackBar.open('Email envoyé avec succès !', 'Fermer', { verticalPosition: 'top', duration: 3000, panelClass: 'alert-success' });
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.snackBar.open('Erreur lors de l\'envoi de l\'email', 'Fermer', { verticalPosition: 'top', duration: 3000, panelClass: 'alert-error' });
        },
      });
  }

  cancel() {
    if (this.originalQuote && this.originalAppointment) {
      this.quote = { ...this.originalQuote };
      this.appointment = { ...this.originalAppointment };
    }
  }
}
