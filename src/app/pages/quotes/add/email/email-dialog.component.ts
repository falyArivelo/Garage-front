import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-dialog',
  standalone: true,
  imports: [
    FormsModule, 
    EditorModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDialogModule,
    MatCardModule,
],
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent {
    to: string;
    subject: string = 'Confirmation de la génération de votre devis';
    text: string = `Bonjour cher client,
Votre devis est prêt et joint à cet e-mail. N’hésitez pas à nous contacter pour toute question ou modification.
Dans l’attente de votre retour.
Cordialement,`;

    constructor(
        public dialogRef: MatDialogRef<EmailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { clientEmail: string },
        private snackBar: MatSnackBar,
    ) {
        this.to = data.clientEmail; // Récupérer l'email du client depuis l'appel du dialogue
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    sendEmail(): void {
        this.dialogRef.close({ to: this.to, subject: this.subject, text: this.text });
    }

     // Afficher un snackbar de succès
    showSuccessMessage() {
        this.snackBar.open('Email envoyé avec succès !', 'Fermer', {
        duration: 3000,  // Durée de l'affichage (en ms)
        horizontalPosition: 'right',  // Position horizontale (left, center, right)
        verticalPosition: 'top',  // Position verticale (top, bottom)
        panelClass: ['snack-success']  // Classe pour personnaliser le style
        });
    }
}