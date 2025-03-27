import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('carcare-token');

    if (token) {
      // Si le token est présent, autoriser l'accès
      return true;
    }

    // Sinon, rediriger vers la page de login
    this.router.navigate(['/authentication/landing']);
    return false;
  }
}