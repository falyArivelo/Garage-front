import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.baseUrl; // URL de l'API backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode utilitaire pour obtenir les en-têtes d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('carcare-token'); // Récupérer le token depuis localStorage
    if (!token) {
      throw new Error('Token manquant');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  // Créer un utilisateur
  createUser(user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/users`, user, { headers });
  }

  // Récupérer tous les utilisateurs
  getAllUsers(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }

  // Récupérer un utilisateur par son ID
  getUserById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/users/${id}`, { headers });
  }

  // Mettre à jour un utilisateur
  updateUser(id: string, user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/users/${id}`, user, { headers });
  }

  // Supprimer un utilisateur
  deleteUser(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers });
  }

  // Assigner un utilisateur à une tâche (par exemple, assigner un mécanicien à une tâche)
  assignUserToTask(taskId: string, userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/tasks/assign`, { taskId, userId }, { headers });
  }

  getMechanics(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/mechanics`, { headers });
  }
}
