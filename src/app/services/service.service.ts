import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment' 
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class ServiceService {
    private apiUrl = environment.baseUrl 

    constructor(private http: HttpClient,private authService: AuthService) {}

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

    // Ajout service
    addService(service: any): Observable<any> {
      const { _id, ...rest } = service; // Exclut _id
      const dataToSend = { ...rest }; // Envoie seulement les données nécessaires
      const headers = this.getAuthHeaders();
      return this.http.post(`${this.apiUrl}/services`, dataToSend, { headers })
    }

    // Liste tous les services
    getServices(): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(`${this.apiUrl}/services`, { headers });
    }

    // Obtenir un service par son ID
    getServiceById(id: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get<any>(`${this.apiUrl}/services/${id}`, { headers });
    }
    
    // Modifie par service
    updateService(service: any): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.put(`${this.apiUrl}/services/${service._id}`, service, { headers })
    }

    // Supprime un service
    deleteService(id: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.delete(`${this.apiUrl}/services/${id}`)
    }
}