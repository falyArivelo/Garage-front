import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

export interface QuoteData {
    _id: string;
    appointment: any;
    frais: number;
    total: number;
    status: 'En attente' | 'Validé' | 'Annulé';
    validUntil: Date;
}

@Component({
    selector: 'app-all',
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        TablerIconsModule,
        MatProgressBarModule,
        NgScrollbarModule,
        RouterModule,
        FormsModule,
    ],
    templateUrl: './all.component.html',
    styleUrl: './all.component.scss'
})

export class QuoteAllComponent implements OnInit {

    constructor(
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private authService: AuthService,
        private router: Router,
    ) { }


    ngOnInit(): void {
    }

}