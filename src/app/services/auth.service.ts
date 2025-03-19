import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface User {
  user_id: string;
  username: string;
  email: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router,) {
    this.loadUserFromLocalStorage();
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return new Observable<User>(observer => {
      this.http.post<User>(`${environment.baseUrl}/login`, credentials)
        .subscribe({
          next: (user) => {
            this.storeUser(user);
            observer.next(user);
          },
          error: (error) => observer.error(error)
        });
    });
  }

  signup(userData: { username: string; email: string; password: string; }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/signup`, userData);
  }

  logout(): void {
    localStorage.removeItem('carcare-token'); // ou le nom de ton token
    localStorage.removeItem('carcare-user');
    this.router.navigate(['/authentication/login']); // ou une autre page publique
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  hasRole(requiredRole: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.role === requiredRole;
  }

  private storeUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('carcare-token', user.token);
    localStorage.setItem('carcare-user', JSON.stringify(user));
  }

  private loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('carcare-user')
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser)
    }
  }

  get currentUserValue(): User | null {
    return this.currentUser;
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem("carcare-user");
    const token = localStorage.getItem("carcare-token");
    return user !== null && token !== null;
  }

  getUserRole(): string | null {
    return localStorage.getItem('user-role'); // Récupère le rôle de l'utilisateur
  }

}
