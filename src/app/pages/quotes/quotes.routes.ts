import { Routes } from '@angular/router';

// Composants
import { RoleGuard } from 'src/app/guards/role.guard';
import { QuoteAddComponent } from './add/add.component';
import { AppointmentDetailByIdComponent } from './detail/detail.component';
import { QuoteEditComponent } from './edit/edit.component';

export const QuotesRoutes: Routes = [
  {
    path: 'add/:appointmentId',
    canActivate: [RoleGuard],
    data: { roles: ['manager'] },
    loadComponent: () => import('./add/add.component').then(m => m.QuoteAddComponent)
  },
  {
    path: 'detail/appointment/:appointmentId',
    canActivate: [RoleGuard],
    data: { roles: ['manager','client'] },
    loadComponent: () => import('./detail/detail.component').then(m => m.AppointmentDetailByIdComponent)
  },
  {
    path: 'edit/:id',
    canActivate: [RoleGuard],
    data: { roles: ['manager','client'] },
    loadComponent: () => import('./edit/edit.component').then(m => m.QuoteEditComponent)
  }
];
