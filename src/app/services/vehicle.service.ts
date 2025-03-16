import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = environment.baseUrl // Remplacez par l'URL de votre API

  constructor(private http: HttpClient, private authService: AuthService) { }

  getVehicles(): Observable<any[]> {
    // Récupérez le token d'authentification depuis le stockage local ou un service d'authentification
    const token = localStorage.getItem('carcare-token'); // Ou une autre méthode pour récupérer le token

    // Si le token existe, on l'ajoute à l'en-tête
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/vehicles`, { headers });
  }

  getAllVehiclesMe(): Observable<any[]> {
    const token = localStorage.getItem('carcare-token'); // Récupérer le token du stockage local
    const user = this.authService.currentUserValue;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    const params = new HttpParams().set('user_id', user?.user_id ?? '');

    return this.http.get<any[]>(`${this.apiUrl}/vehicles/me`, { headers, params });
  }

  getVehicleById(id: string): Observable<any> {
    const token = localStorage.getItem('carcare-token'); // Récupérer le token du stockage local

    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.get<any>(`${this.apiUrl}/vehicle/${id}`, { headers });
  }

  // Méthode pour mettre à jour un véhicule avec le token d'authentification
  updateVehicle(vehicleData: any): Observable<any> {
    const token = localStorage.getItem('carcare-token'); // Récupère le token du stockage local ou d'un autre moyen

    if (!token) {
      throw new Error('Token manquant');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Inclure le token dans les en-têtes
    });

    return this.http.put(`${this.apiUrl}/vehicle/${vehicleData._id}`, vehicleData, { headers });
  }

  saveVehicle(vehicleData: any): Observable<any> {
    const token = localStorage.getItem('carcare-token'); // Récupère le token du stockage local ou d'un autre moyen
    if (!token) {
      throw new Error('Token manquant');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Inclure le token dans les en-têtes
    });
    const user = this.authService.currentUserValue;
    const { _id, ...rest } = vehicleData;

    const dataToSend = {
      ...rest,
      owner: user?.user_id ?? '',
    };
    console.log(dataToSend)

    return this.http.post(`${this.apiUrl}/vehicles`, dataToSend, { headers });
  }


  deleteVehicle(id: string): Observable<any> {
    const token = localStorage.getItem('carcare-token'); // Récupère le token du stockage local ou d'un autre moyen
    if (!token) {
      throw new Error('Token manquant');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Inclure le token dans les en-têtes
    });

    const encodedId = encodeURIComponent(id);
    console.log(`Encoded ID: ${encodedId}`);
    return this.http.delete(`${this.apiUrl}/vehicle/${encodedId}`, { headers });
  }
  
}
