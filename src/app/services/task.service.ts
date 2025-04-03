import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.baseUrl}/tasks`; // L'URL de ton API

  constructor(private http: HttpClient, private authService: AuthService) { }

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

  // Ajouter une nouvelle tâche
  createTask(task: any): Observable<any> {
    const { _id, ...rest } = task; // Exclut _id
    const dataToSend = { ...rest }; // Envoie seulement les données nécessaires
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, dataToSend, { headers });
  }

  // Obtenir toutes les tâches
  getAllTasks(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Obtenir une tâche par son ID
  getTaskById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  // Rechercher une tâche par son nom
  getTaskByName(name: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/name/${name}`, { headers });
  }

  // Mettre à jour une tâche
  updateTask(task: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${task._id}`, task, { headers });
  }

  // Supprimer une tâche
  deleteTask(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  // Assigner une tâche à un mécanicien
  assignTask(taskId: string, mechanicId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${taskId}/assign`, { mechanicId }, { headers });
  }

  // Fonction pour récupérer les tâches d'un appointment
  getTasksForAppointment(appointmentId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/appointments/${appointmentId}`, { headers });
  }

  getTasksByMechanic(mechanicId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/mechanic/${mechanicId}`, { headers });
  }

  // Marquer une tâche comme terminée
  markTaskAsDone(taskId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${taskId}/complete`, {}, { headers });
  }

  updateTaskStatus(taskId: string, status: string, message?: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const userId = this.authService.currentUserValue?.user_id
    return this.http.put(`${this.apiUrl}/${taskId}/updateStatus`, { status, message ,userId}, { headers });
  }

}
