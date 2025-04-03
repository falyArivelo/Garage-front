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
  OnInit,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';
import { BrandingComponent } from '../sidebar/branding.component';
import { AuthService, User } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';

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
export class AppTopstripComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();

  email = (this.authService.currentUserValue as User)?.email || '';
  userId: string;
  userImage: string | ArrayBuffer | null = null;
  defaultImage: string = "/assets/images/profile/user-1.jpg"

  constructor(public authService: AuthService, private userService: UserService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.userId = this.authService.currentUserValue?.user_id || ''; // Récupère l'ID de l'utilisateur depuis l'URL
    this.loadUserImage();
  }

  logout() {
    this.authService.logout();
  }

  loadUserImage(): void {
    this.uploadService.getUserImage(this.userId).subscribe(
      {
        next: (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.userImage = reader.result; // Convertit l'image Blob en Data URL
          };
          reader.readAsDataURL(imageBlob); // Convertit l'image Blob en base64
        },
        error: (error: any) => {
          console.error('Error loading image:', error);
          this.userImage = this.defaultImage; 
        }
      }
    );

  }
}