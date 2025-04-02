import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ServiceData } from '../../services/all/all.component';
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
    MatDatepickerModule,
    MatNativeDateModule,
    NgScrollbarModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    CurrencyFormatPipe
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllAppointmentComponent {
  displayedColumns: string[] = ['client', 'vehicle', 'services', 'totalEstimatedPrice', 'appointmentDate', 'status', 'menu'];
  @Input() dataSource: any[] = [];
  filteredDataSource: MatTableDataSource<any> = new MatTableDataSource();
  pagedData: any[] = []; // Variable pour stocker les données paginées
  currentPage = 0; // Page courante
  pageSize = 4; // Nombre d'éléments par page
  totalPages: number = 0; // Total des pages
  isLoading = true;

  constructor(
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  filterValues = {
    vehicle: '',
    services: '',
    dateMin: null, 
    dateMax: null,
    status: '',
  };

  ngOnInit(): void {
    if (this.dataSource && this.dataSource.length > 0) {
        this.filteredDataSource = new MatTableDataSource(this.dataSource);
        this.applyFilter();  // Appliquer le filtre immédiatement si les données sont déjà présentes
        this.isLoading = false;
    } else {
        this.loadAppointments(); // Si dataSource est vide ou non défini, charger les services depuis l'API
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si dataSource change, réinitialisez le filtre
    if (changes['dataSource'] && this.dataSource) {
        this.filteredDataSource.data = this.dataSource;
        this.applyFilter(); // Appliquez le filtre dès que les données changent
    }
  }

  loadAppointments(): void {
    this.isLoading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (appointments: any[]) => {
        this.dataSource = appointments;
        this.filteredDataSource = new MatTableDataSource(appointments); 
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // Appliquer le filtre
  applyFilter() {
    if (!this.dataSource || this.dataSource.length === 0) {
        return;  // Ne rien faire si dataSource est vide ou non défini
    }

    const filtered = this.dataSource.filter(appointment => {
      // Vérification si vehicle existe et si vehicle.brand existe
      const vehicleBrand = appointment.vehicle && appointment.vehicle.brand ? appointment.vehicle.brand.trim().toLowerCase() : '';

      // Filtrage du véhicule si 'vehicle' est défini et le filtre est non vide
      const vehicleMatches = vehicleBrand.includes(this.filterValues.vehicle.toLowerCase()) || !this.filterValues.vehicle;

      // Vérification des services uniquement si services existe et est un tableau
      let servicesMatch = true;
      if (Array.isArray(appointment.services)) {
          servicesMatch = appointment.services.some((service: ServiceData) => 
              service.name && service.name.toLowerCase().includes(this.filterValues.services.trim().toLowerCase())
          );
      }

      // Vérification des dates min et max
      const dateMatches = (this.filterValues.dateMin == null || new Date(appointment.appointmentDate).setHours(0, 0, 0, 0) >= new Date(this.filterValues.dateMin).setHours(0, 0, 0, 0)) &&
          (this.filterValues.dateMax == null || new Date(appointment.appointmentDate).setHours(0, 0, 0, 0) <= new Date(this.filterValues.dateMax).setHours(0, 0, 0, 0));

      // Filtrage du statut
      const statusMatches = this.filterValues.status === '' || appointment.status === this.filterValues.status;

      // Retourner true si toutes les conditions sont remplies
      return vehicleMatches && servicesMatch && dateMatches && statusMatches;
    });

    // Mise à jour de filteredDataSource
    this.filteredDataSource.data = filtered;
    // Réinitialiser la page courante si les résultats filtrés changent
    this.currentPage = 0;
    this.totalPages = Math.ceil(this.filteredDataSource.data.length / this.pageSize); // Calculer le nombre de pages total
    this.updatePagedData();
    this.cdr.detectChanges();
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

  updatePagedData() {
    // Assurez-vous que filteredDataSource contient les données filtrées
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.filteredDataSource.data.slice(startIndex, endIndex); // Utiliser pagedData ici
  }

  // Passer à la page suivante
  nextPage() {
      if (this.currentPage < this.totalPages - 1) {
          this.currentPage++;
          this.updatePagedData();
      }
  }

  // Passer à la page précédente
  previousPage() {
      if (this.currentPage > 0) {
          this.currentPage--;
          this.updatePagedData();
      }
  }

  // Aller à une page spécifique
  goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page - 1;
          this.updatePagedData();
      }
  }

  // Obtenir les numéros de page à afficher pour la pagination
  getPageNumbers() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Confirmé': return 'primary';
      case 'En cours': return 'warning';
      case 'En attente': return 'warning';
      case 'Terminé': return 'success';
      case 'Annulé': return 'error';
      default: return 'default';
    }
  }
}


