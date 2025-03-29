import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service'; // Assurez-vous que le service AuthService est bien importé

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = environment.baseUrl; // L'URL de votre API

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Méthode utilitaire pour obtenir les en-têtes d'authentification
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

  // Créer un rendez-vous
  createAppointment(appointmentData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/appointments`, appointmentData, { headers });
  }

  // Obtenir tous les rendez-vous
  getAllAppointments(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/appointments`, { headers });
  }

  // Obtenir les rendez-vous d'un client par clientId
  getAppointmentsByClient(): Observable<any[]> {
    const user = this.authService.currentUserValue; // Récupérer l'utilisateur connecté
    console.log('User ID envoyé:', user?.user_id);
    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('user_id', user?.user_id ?? '');
    return this.http.get<any[]>(`${this.apiUrl}/appointments/client`, { headers, params });
  }

  // Obtenir un rendez-vous par son ID
  getAppointmentById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/appointments/${id}`, { headers });
  }

  // Mettre à jour un rendez-vous
  updateAppointment(id: string, appointmentData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/appointments/${id}`,appointmentData, { headers });
  }

  // Supprimer un rendez-vous
  cancelAppointment(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/appointments/cancel/${id}`,{},{ headers });
  }

  changingStatusAppointmentByManager(id: string, status: string, message: string, userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { status, message, userId };  // Envoie le statut, message et l'ID de l'utilisateur
    return this.http.put(`${this.apiUrl}/appointments/changing-status-manager/${id}`, body,{headers});
  }
}
