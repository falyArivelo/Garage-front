import { Routes } from '@angular/router';

// Composants
import { PieceAllComponent } from './all/all.component';
import { RoleGuard } from 'src/app/guards/role.guard';

export const PiecesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        canActivate: [RoleGuard],
        data: { roles: ['manager', 'mecanicien'] },
        component: PieceAllComponent, // Affiche tous les pieces
      }
    ],
  },
];
