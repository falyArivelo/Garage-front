import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { StatusService } from 'src/app/services/status.service';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-task-list',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
  imports:[CommonModule,MaterialModule,RouterModule,TablerIconsModule],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(
      {
        next: (data) => {
          this.tasks = data;
        },
        error: (error) => {
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
