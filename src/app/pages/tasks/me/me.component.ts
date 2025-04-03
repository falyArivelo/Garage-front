import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { StatusService } from 'src/app/services/status.service';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-me',
  imports: [CommonModule, MaterialModule,RouterModule,TablerIconsModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss'
})
export class MyTasksComponent implements OnInit {
  tasks: any[] = [];
  mechanicId = ''; // Remplace par l'ID réel du mécanicien
  displayedColumns = ['service', 'mechanic', 'date', 'duration', 'status', 'menu']

  constructor(private taskService: TaskService,
    private authService: AuthService,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    // const mechanicId = this.authService.currentUserValue?.user_id
    const mechanicId = this.authService.currentUserValue!.user_id;
    this.taskService.getTasksByMechanic(mechanicId?.toString()).subscribe(
      {
        next: (data: any) => {
          this.tasks = data;
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération des tâches', error);
        }
      }
    );
  }

  viewTaskDetails(task: any): void {
    console.log('Détails de la tâche :', task);
    // Ici, tu peux naviguer vers une page de détails ou afficher un dialogue modal
  }

  getStatusColor(status: string): string {
    return this.statusService.getStatusColor(status);
  }
}
