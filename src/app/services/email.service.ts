import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class EmailService {
    private apiUrl = environment.baseUrl; // L'URL de votre API

    constructor(
        private http: HttpClient, 
        private authService: AuthService
    ) { }
    
    // Méthode utilitaire pour obtenir les en-têtes d'authentification
      private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('carcare-token'); // Récupérer le token depuis le localStorage
        console.log('Token récupéré:', token);
        if (!token) {
          throw new Error('Token manquant');
        }
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        });
    }

    // Envoyer e-mail
    sendEmail(to: string, subject: string, text: string) {
        const headers = this.getAuthHeaders();
        return this.http.post(`${this.apiUrl}/send-email`, { to, subject, text }, { headers});
    }
}