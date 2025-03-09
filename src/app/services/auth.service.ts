import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,private router: Router,) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/login`, credentials);
  }

  signup(userData: { username: string; email: string; password: string; }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/signup`, userData);
  }

  logout(): void {
    localStorage.removeItem('carcare-token'); // ou le nom de ton token
    this.router.navigate(['/authentication/login']); // ou une autre page publique
  }
}
