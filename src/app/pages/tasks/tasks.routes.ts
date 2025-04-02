import { Routes } from '@angular/router';

// Composants
import { TaskAddComponent } from './add/add.component';
import { TaskListComponent } from './all/all.component';
import { TaskEditComponent } from './edit/edit.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { MyTasksComponent } from './me/me.component';
import { TaskEditReasonComponent } from './edit-reason/edit-reason.component';

export const TaskRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add/:idAppointment',
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
        component: TaskAddComponent, // Ajouter une tâche
      },
      {
        path: 'all',
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
        component: TaskListComponent, // Afficher toutes les tâches
      },
      {
        path: 'me',
        canActivate: [RoleGuard],
        data: { roles: ['mecanicien'] },
        component: MyTasksComponent, // Afficher toutes les tâches
      },
      {
        path: 'edit/:id',
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
        component: TaskEditComponent, // Modifier une tâche
      },
      {
        path: 'editReason/:id',
        canActivate: [RoleGuard],
        data: { roles: ['manager','mecanicien'] },
        component: TaskEditReasonComponent, // Modifier une tâche
      }
      
    ],
  },
];
