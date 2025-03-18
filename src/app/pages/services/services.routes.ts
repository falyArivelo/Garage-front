import { Routes } from '@angular/router';

// Composants
import { ServiceAddButtonComponent } from './addButton/addButton.component';
import { ServiceAllComponent } from './all/all.component';
import { RoleGuard } from 'src/app/guards/role.guard';

export const ServicesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'addButton',
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
        component: ServiceAddButtonComponent, // Bouton ajout et Affiche tous les services
      },
      {
        path: 'all',
        canActivate: [RoleGuard],
        component: ServiceAllComponent, // Bouton ajout et Affiche tous les services
      }

    ],
  },
];
