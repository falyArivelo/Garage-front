import { Routes } from '@angular/router';

// Composants
import { RoleGuard } from 'src/app/guards/role.guard';
import { UploadComponent } from './upload/upload.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'upload',
        component: UploadComponent, // Ajouter un utilisateur
      },
    //   {
    //     path: 'all',
    //     canActivate: [RoleGuard],
    //     data: { roles: ['manager', 'client'] },
    //     component: UserAllComponent, // Afficher tous les utilisateurs
    //   },
    //   {
    //     path: 'edit/:id',
    //     canActivate: [RoleGuard],
    //     data: { roles: ['manager'] },
    //     component: UserEditComponent, // Modifier un utilisateur
    //   },
    //   {
    //     path: 'details/:id',
    //     canActivate: [RoleGuard],
    //     data: { roles: ['manager', 'client'] },
    //     component: UserDetailsComponent, // Détails d'un utilisateur
    //   }
    ],
  },
];
