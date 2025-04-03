import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment' 

@Injectable({
  providedIn: 'root'
})
export class UploadService {
    private apiUrl = environment.baseUrl // L'URL de votre API

  constructor(private http: HttpClient) { }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('carcare-token'); // Récupérer le token depuis le localStorage
    if (!token) {
      throw new Error('Token manquant');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  // Méthode pour uploader l'image
  uploadImage(userId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.apiUrl}/upload/${userId}`, formData, { headers });
  }

    // Méthode pour récupérer l'image de l'utilisateur
    getUserImage(userId: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/user/image/${userId}`, { responseType: 'blob' });
    }
}
