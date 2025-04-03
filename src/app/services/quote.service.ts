import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class QuoteService {
    private apiUrl = environment.baseUrl // L'URL de votre API

    constructor(private http: HttpClient, private authService: AuthService) {}

    // Méthode utilitaire pour obtenir les en-têtes d'authentification
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('carcare-token'); // Récupérer le token depuis le localStorage
      if (!token) {
        throw new Error('Token manquant');
      }
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
    }

    // Ajout quote
    createQuote(quote: any): Observable<any> {
      const { _id, ...rest } = quote; // Exclut _id
      const dataToSend = { ...rest }; // Envoie seulement les données nécessaires
      const headers = this.getAuthHeaders();
      return this.http.post(`${this.apiUrl}/quotes`, dataToSend, { headers });
    }

    // Liste toutes les quotes
    getAllQuotes(): Observable<any[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(`${this.apiUrl}/quotes`, { headers });
    }

    // Obtenir un quote par son ID
    getQuoteById(id: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get<any>(`${this.apiUrl}/quotes/${id}`, { headers });
    }

    // Obtenir un quote par idAppointment
    getQuoteByIdAppointment(idAppointment: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get<any>(`${this.apiUrl}/quotes/appointment/${idAppointment}`, { headers });
    }

    // Modifie par quote
    updateQuote(quote: any): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.put(`${this.apiUrl}/quotes/${quote._id}`, quote, { headers });
    }

    // Supprime un quote
    deleteQuote(id: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.delete(`${this.apiUrl}/quotes/${id}`, { headers });
    }
}