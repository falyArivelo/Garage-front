import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { CurrencyFormatPipe } from 'src/app/helpers/pipe/currencyFormat.pipe';

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
    MatSnackBarModule,
    CurrencyFormatPipe
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllAppointmentComponent {
  displayedColumns: string[] = ['vehicle', 'appointmentDate', 'status','services','client','totalEstimatedPrice', 'menu'];
  @Input() dataSource: any[] = [];
  isLoading = true;

  constructor(
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (!this.dataSource || this.dataSource.length === 0) {
      this.loadAppointments();
    } else {
      this.isLoading = false
    }
  }


  loadAppointments(): void {
    this.isLoading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (appointments: any[]) => {
        this.dataSource = appointments;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Erreur lors du chargement des rendez-vous', 'Fermer', { duration: 3000 });
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/appointments', id]);
  }

  deleteAppointment(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce rendez-vous ?')) {
      // this.appointmentService.deleteAppointment(id).subscribe(() => {
      //   this.snackBar.open('Rendez-vous supprimé', 'Fermer', { duration: 2000 });
      //   this.loadAppointments();
      // });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Confirmé': return 'accent';
      case 'En cours': return 'primary';
      case 'Terminé': return 'green';
      case 'Annulé': return 'warn';
      default: return 'default';
    }
  }
}


