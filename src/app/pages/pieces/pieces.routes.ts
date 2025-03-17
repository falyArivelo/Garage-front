import { Routes } from '@angular/router';

// Composants
import { PieceAddButtonComponent } from './addButton/addButton.component';
import { PieceAllComponent } from './all/all.component';
import { RoleGuard } from 'src/app/guards/role.guard';

export const PiecesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
        component: PieceAddButtonComponent, // Ajouter une piece
      },
      {
        path: 'addButton',
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
        component: PieceAllComponent, // Affiche toutes les pieces
      },
      {
        path: 'all',
        canActivate: [RoleGuard],
        data: { roles: ['manager', 'mecanicien'] },
        component: PieceAllComponent, // Affiche toutes les pieces
      }
    ],
  },
];
