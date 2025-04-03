import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppointmentData } from '../client-appointment/all/all.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { StatusService } from 'src/app/services/status.service';
import { CurrencyFormatPipe } from 'src/app/helpers/pipe/currencyFormat.pipe';

@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        TablerIconsModule,
        MatProgressBarModule,
        NgScrollbarModule,
        RouterModule,
        CurrencyFormatPipe
    ],
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})

export class AppointmentDetailByIdComponent {
    appointment: AppointmentData | null = null;
    isLoading = true;

    constructor(
        private appointmentService: AppointmentService,
        private route: ActivatedRoute,
        private statusService: StatusService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.appointmentService.getAppointmentById(id).subscribe((data) => {
                this.appointment = data;
                this.isLoading = false;
            });
        }
    }

    getStatusColor(status: string): string {
        return this.statusService.getStatusColor(status);
    }
}