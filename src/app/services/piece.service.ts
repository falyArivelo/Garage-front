import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment' // Import de l’environnement

@Injectable({
    providedIn: 'root',
})

export class PieceService {
    private apiUrl = `${environment.baseUrl}/pieces` // Utilisation de la variable d’environnement
    
    constructor(private http: HttpClient) {}
    // Liste toutes les pieces
    getPieces(): Observable<any> {
      return this.http.get(this.apiUrl)
    }
    // Ajout piece
    addPiece(piece: any): Observable<any> {
      return this.http.post(this.apiUrl, piece)
    }
    // Modifie par piece
    updatePiece(id: string, piece: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, piece)
    }
    // Supprime une piece
    deletePiece(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`)
    }
}