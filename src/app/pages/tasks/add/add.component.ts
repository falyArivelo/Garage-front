import { Component, OnInit } from '@angular/core';
import { AssignMechanicDialogComponent } from './assign-mechanic-dialog.component';
import { TaskService } from '../../../services/task.service';
import { AppointmentService } from '../../../services/appointment.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyFormatPipe } from 'src/app/helpers/pipe/currencyFormat.pipe';
import { EmailService } from 'src/app/services/email.service';
import { MaterialModule } from 'src/app/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-add',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyFormatPipe,
    MaterialModule
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class TaskAddComponent implements OnInit {
  // displayedColumns: string[] = ['vehicle', 'appointmentDate', 'status','services','client','totalEstimatedPrice', 'menu'];
  displayedColumns: string[] = [
    'client',
    'vehicle',
    'services',
    'appointmentDate',
    'status',
    'totalEstimatedPrice'
  ];
  taskForm: FormGroup;
  appointment: any; // Nous n'avons besoin que d'un seul appointment
  services: any[] = []; // Liste des services liée à l'appointment
  mechanics: any[] = []; // Liste des mécaniciens
  tasks: any[] = [];
  isFormEnable: boolean = false;

  constructor(
    private taskService: TaskService,
    private appointmentService: AppointmentService,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private emailService: EmailService,
    private statusService: StatusService
  ) {
    this.taskForm = this.fb.group({
      appointmentId: ['', Validators.required],
      serviceId: ['', Validators.required],
      mechanicId: ['', Validators.required],
      scheduledDateTime: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const appointmentId = params.get('idAppointment');
      if (appointmentId) {
        this.loadAppointmentDetails(appointmentId);
        this.loadTasksAppointment(appointmentId)

        this.taskForm.patchValue({
          appointmentId: appointmentId
        });
      }

    });
    this.loadMechanics();

  }


  loadAppointmentDetails(id: string) {
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (data: any) => {
        this.appointment = data; // Un seul appointment
        this.services = data.services; // Liste des services
        this.isFormEnable = this.appointment?.status === 'En attente' || this.appointment?.status === 'Confirmé' 


      },
      error: () => {
      }
    });
  }

  loadMechanics() {
    this.userService.getMechanics().subscribe(data => {
      this.mechanics = data;
    });
  }

  createTask() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      this.taskService.createTask(taskData).subscribe({
        next: (response) => {
          console.log('Tâche créée avec succès:', response);
          this.snackBar.open(response.message, 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Fermer', { duration: 3000 });
          console.error('Erreur lors de la création de la tâche', error);

        }
      });
    }
  }

  cancel() {
    this.taskForm.reset();
  }
  getStatusColor(status: string): string {
    return this.statusService.getStatusColor(status);
  }

  onServiceChange(serviceId: string): void {
    // console.log(serviceId)
    const selectedService = this.services.find(s => s._id === serviceId);
    // console.log(selectedService)
    if (selectedService) {
      this.taskForm.get('duration')?.setValue(selectedService.estimatedDuration);
    }
  }

  loadTasksAppointment(appointmentId: string): void {
    // Récupérer les tâches liées à l'appointment
    this.taskService.getTasksForAppointment(appointmentId).subscribe({
      next: (response) => {
        this.tasks = response.tasks; // Stocker les tâches récupérées
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    }
    );
  }

  viewTaskDetails(task: any): void {
    console.log('Détails de la tâche :', task);
    // Ici, tu peux naviguer vers une page de détails ou afficher un dialogue modal
  }

}
