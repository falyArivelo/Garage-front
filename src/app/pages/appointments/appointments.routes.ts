import { Routes } from '@angular/router';

// Composants
import { AppointmentAddComponent } from './book-appointment/book-appointment.component';
import { AppointmentClientAllComponent } from './client-appointment/all/all.component';
// import { AppointmentListComponent } from './list/list.component';
// import { AppointmentEditComponent } from './edit/edit.component';
import { RoleGuard } from 'src/app/guards/role.guard';

export const AppointmentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'book',
        canActivate: [RoleGuard],
        data: { roles: ['client'] },
        component: AppointmentAddComponent, // Page pour prendre rendez-vous
      },
      {
        path: 'allClient',
        canActivate: [RoleGuard],
        data: { roles: ['client'] },
        component: AppointmentClientAllComponent,
      }
    //   {
    //     path: 'all',
    //     canActivate: [RoleGuard],
    //     data: { roles: ['manager', 'mecanicien'] },
    //     component: AppointmentListComponent, // Liste de tous les rendez-vous
    //   },
    //   {
    //     path: 'edit/:id',
    //     canActivate: [RoleGuard],
    //     data: { roles: ['client'] },
    //     component: AppointmentEditComponent, // Modifier un rendez-vous
    //   },
    ],
  },
];
