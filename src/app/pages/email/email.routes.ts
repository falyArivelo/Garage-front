import { Routes } from '@angular/router';

// Composants
import { EmailComponent } from './sendEmail/sendEmail.component';
import { RoleGuard } from 'src/app/guards/role.guard';

export const EmailRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sendEmail',
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
        component: EmailComponent,
      },
    ],
  },
];
