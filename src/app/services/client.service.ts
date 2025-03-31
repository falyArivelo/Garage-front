import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Assurez-vous d'avoir un fichier environment.ts configuré

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private apiUrl = `${environment.baseUrl}`; // Assurez-vous de définir l'URL de votre API dans environment.ts

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('carcare-token'); // Récupérer le token depuis le localStorage
    if (!token) {
      throw new Error('Token manquant');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Méthode pour récupérer un utilisateur par ID
  getUserById(userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users/${userId}`, { headers });
  }

  // Méthode pour modifier un utilisateur
  updateUser(userId: string, updatedUser: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/users${userId}`, updatedUser, { headers });
  }
}
