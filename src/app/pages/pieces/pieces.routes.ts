import { Routes } from '@angular/router';

// Composants
import { PieceAddButtonComponent } from './addButton/addButton.component';
import { PieceAddComponent } from './add/add.component';
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
        component: PieceAddComponent, // Ajouter une piece
      },
      {
        path: 'addButton',
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
        component: PieceAddButtonComponent, // Bouton Ajout et Affiche toutes les pieces
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
