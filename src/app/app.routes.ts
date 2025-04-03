import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { LandingComponent } from './pages/landing/landing.component';
export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'email',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/email/email.routes').then((m) => m.EmailRoutes),
      },
      {
        path: 'vehicles',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/vehicles/vehicles.routes').then((m) => m.VehicleRoutes),
      },
      {
        path: 'appointments',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/appointments/appointments.routes').then((m) => m.AppointmentRoutes),
      },
      {
        path: 'pieces',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/pieces/pieces.routes').then((m) => m.PiecesRoutes),
      },
      {
        path: 'services',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/services/services.routes').then((m) => m.ServicesRoutes),
      },
      {
        path: 'tasks',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/tasks/tasks.routes').then((m) => m.TaskRoutes),
      },
      {
        path: 'users',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/users/users.routes').then((m) => m.UsersRoutes),
      },
      {
        path: 'ui-components',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'landing',
        component: LandingComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  }
];
