import { Routes } from '@angular/router';

// Composants
import { VehiclesMeComponent } from './me/me.component';
import { VehiclesAllComponent } from './all/all.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { VehicleAddComponent } from './add/add.component';
import { VehicleEditComponent } from './edit/edit.component';

export const VehicleRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'me',
        canActivate: [RoleGuard],
        data: { roles: ['client'] },
        component: VehiclesMeComponent, // Affiche les véhicules de l'utilisateur
      },
      {
        path: 'all',
        canActivate: [RoleGuard],
        data: { roles: ['manager', 'mecanicien'] },
        component: VehiclesAllComponent, // Affiche tous les véhicules
      },
      {
        path: 'add',
        component: VehicleAddComponent, // Affiche tous les véhicules
      },
      {
        path: 'edit/:id',
        canActivate: [RoleGuard],
        data: { roles: ['client'] },
        component: VehicleEditComponent
      }

    ],
  },
];
