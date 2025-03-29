import { Routes } from '@angular/router';

// Composants
import { AppointmentAddComponent } from './book-appointment/book-appointment.component';
import { AppointmentClientAllComponent } from './client-appointment/all/all.component';
// import { AppointmentListComponent } from './list/list.component';
// import { AppointmentEditComponent } from './edit/edit.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { AllAppointmentComponent } from './all/all.component';
import { EditAppointmentComponent } from './edit/edit.component';
import { ChangeStatusComponent } from './change-status/change-status.component';

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
        path: 'all',
        canActivate: [RoleGuard],
        data: { roles: ['manager', 'mecanicien'] },
        component: AllAppointmentComponent, // Liste de tous les rendez-vous
      },
      {
        path: 'allClient',
        canActivate: [RoleGuard],
        data: { roles: ['client'] },
        component: AppointmentClientAllComponent,
      },
      {
        path: 'edit/:id',
        canActivate: [RoleGuard],
        data: { roles: ['client'] },
        component: EditAppointmentComponent, // Modifier un rendez-vous
      },
      {
        path: 'status-change/:id',
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
        component: ChangeStatusComponent, // Modifier un rendez-vous
      },
    ],
  },
];
