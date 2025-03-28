import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-sendEmail',
  standalone: true, // Déclare ce composant comme standalone
  imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressBarModule,
        EditorModule, // Ajout du module TinyMCE
      ],
  templateUrl: './sendEmail.component.html',
  styleUrls: ['./sendEmail.component.scss'],
})
export class EmailComponent {
  to = '';
  subject = '';
  text = '';

  constructor(private emailService: EmailService) {}

  // Configuration de TinyMCE
  editorConfig = {
    base_url: '/assets/tinymce',  // Change /tinymce en /assets/tinymce
    suffix: '.min',
    plugins: 'lists link image autoresize',
    toolbar: 'undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
    menubar: false,
    height: 300,
    placeholder: 'Veuillez écrire votre message ici...'  // Ajout du placeholder ici
  };
  

  sendEmail() {
    console.log('Données envoyées:', { to: this.to, subject: this.subject, text: this.text });
    this.emailService.sendEmail(this.to, this.subject, this.text)
      .subscribe({
        next: (res) => alert('Email envoyé avec succès !'),
        error: (err) => {
          console.error('Erreur:', err);
          alert('Erreur lors de l\'envoi de l\'email');
        },
      });
  }
}
