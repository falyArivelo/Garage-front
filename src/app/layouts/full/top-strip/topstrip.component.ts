// import { Component } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatMenuModule } from '@angular/material/menu';
// import { TablerIconsModule } from 'angular-tabler-icons';

// @Component({
//     selector: 'app-topstrip',
//     imports: [TablerIconsModule, MatButtonModule, MatMenuModule],
//     templateUrl: './topstrip.component.html',
// })
// export class AppTopstripComponent {
//     constructor() { }

// }

import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';
import { BrandingComponent } from '../sidebar/branding.component';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topstrip',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    MatBadgeModule,
    BrandingComponent
  ],
  templateUrl: './topstrip.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppTopstripComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();

  email = (this.authService.currentUserValue as User)?.email || '';

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}