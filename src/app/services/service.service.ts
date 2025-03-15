import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment' // Import de l’environnement

@Injectable({
    providedIn: 'root',
})

export class ServiceService {
    private apiUrl = `${environment.baseUrl}/services` // Utilisation de la variable d’environnement
    constructor(private http: HttpClient) {}
    // Liste tous les services
    getServices(): Observable<any> {
      return this.http.get(this.apiUrl)
    }
    // Ajout service
    addService(service: any): Observable<any> {
      return this.http.post(this.apiUrl, service)
    }
    // Modifie par service
    updateService(id: string, service: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, service)
    }
    // Supprime un service
    deleteService(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`)
    }
}