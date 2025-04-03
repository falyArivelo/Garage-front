import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFile: File | null = null;
  userId: string; // Remplace par l'ID réel de l'utilisateur

  constructor(private uploadService: UploadService, private authService: AuthService) { }
  ngOnInit(): void {
    this.userId = this.authService.currentUserValue?.user_id ?? '';
  }
  // Méthode appelée quand un fichier est sélectionné
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Méthode pour uploader le fichier
  onUpload(): void {
    if (this.selectedFile) {
      this.uploadService.uploadImage(this.userId, this.selectedFile).subscribe(
        (response) => {
          console.log('Upload réussi', response);
        },
        (error) => {
          console.error('Erreur d\'upload', error);
        }
      );
    } else {
      console.log('Aucun fichier sélectionné');
    }
  }
}
