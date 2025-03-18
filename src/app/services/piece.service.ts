import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment' 
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class PieceService {
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

    // Ajout piece
    createPiece(piece: any): Observable<any> {
      const { _id, ...rest } = piece; // Exclut _id
      const dataToSend = { ...rest }; // Envoie seulement les données nécessaires
      const headers = this.getAuthHeaders();
      return this.http.post(`${this.apiUrl}/pieces`, dataToSend, { headers });
    }

    // Liste toutes les pieces
    getAllPieces(): Observable<any[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(`${this.apiUrl}/pieces`, { headers });
    }

    // Obtenir une piece par son ID
    getPieceById(id: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get<any>(`${this.apiUrl}/pieces/${id}`, { headers });
    }

    // Obtenir le nom d'une piece
    getPieceByName(name: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get<any>(`${this.apiUrl}/pieces/name/${name}`, { headers });
    }

    // Modifie par piece
    updatePiece(piece: any): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.put(`${this.apiUrl}/pieces/${piece._id}`, piece, { headers });
    }

    // Supprime une piece
    deletePiece(id: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.delete(`${this.apiUrl}/pieces/${id}`, { headers });
    }
}