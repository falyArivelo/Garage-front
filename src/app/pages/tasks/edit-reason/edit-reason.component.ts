import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ThemePalette } from '@angular/material/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

export interface Fruit {
  name: string;
}

export interface Vegetable {
  name: string;
}
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { isThursday } from 'date-fns';

@Component({
  selector: 'app-edit-reason',
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    CdkDropList,
    CdkDrag,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MaterialModule,
    BackButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-reason.component.html',
  styleUrl: './edit-reason.component.scss'
})
export class TaskEditReasonComponent {
  availableColors: ChipColor[] = [
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' },
  ];

  // reasons = [
  //   { name: 'Travail en cours', value: 'En cours', color: 'primary' },
  //   { name: 'Terminé', value: 'Terminé', color: 'accent' },
  //   { name: 'Annuler', value: 'Annulé', color: 'danger' },
  //   { name: 'En attente', value: 'En attente', color: 'warn' },
  //   // { name: 'Pièces manquantes', value: 'En attente', color: 'warn' },
  //   // { name: 'Problème technique', value: 'En attente', color: 'warn' },
  //   // { name: 'Changement de priorité', value: 'En attente', color: 'warn' },
  //   // { name: 'Absence du mécanicien', value: 'En attente', color: 'danger' }
  // ];

  selectedReason: string = 'En cours';
  message: string = '';
  currentDateTime: string = new Date().toISOString().slice(0, 16); // Format YYYY-MM-DDTHH:mm
  sendMail: boolean = false;
  taskId: string;
  task: any;
  reasons: { name: string; value: string; color: string; }[];


  constructor(private taskService: TaskService, private route: ActivatedRoute,  private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'URL
    this.taskId = this.route.snapshot.paramMap.get('id') || '';
    this.loadReasons();

    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (task) => {
          this.task = task;
          this.updateSelectedReason();
        },
        error: (err) => {
          console.error("Erreur lors de la récupération de la tâche", err);
        }
      });
    }

  }

  loadReasons() {
    this.reasons = [
    { name: 'Travail en cours', value: 'En cours', color: 'primary' },
    { name: 'Terminé', value: 'Terminé', color: 'accent' },
    { name: 'Annuler', value: 'Annulé', color: 'danger' },
    { name: 'En attente', value: 'En attente', color: 'warn' },
    ];

    this.updateSelectedReason();
  }

  updateSelectedReason() {
    if (this.task && this.task.status && this.reasons.length > 0) {
      const matchedReason = this.reasons.find(reason => reason.value === this.task.status);
      this.selectedReason = matchedReason ? matchedReason.name : '';

      //  Forcer la détection du changement pour mettre à jour l'affichage
      this.cdr.detectChanges();
    }
  }

  validate() {
    console.log("Message :", this.message);
    console.log("Date et heure :", this.currentDateTime);
    console.log("Envoyer mail :", this.sendMail);
  }

  onReasonChange(reason: string) {
    this.selectedReason = reason;
    console.log("Raison sélectionnée:", reason);
  }

  getReasonClasses(reasonName: string): string {
    const reason = this.reasons.find(r => r.name === reasonName);
    return reason && this.selectedReason === reasonName ? reason.color : '';
  }

  getReasonValue(reasonName: string): string {
    const reason = this.reasons.find(r => r.name === reasonName);
    return reason ? reason.value : '';
  }

  updateStatus() {
    const selectedStatus = this.getReasonValue(this.selectedReason)
    this.taskService.updateTaskStatus(this.taskId, selectedStatus, this.message).subscribe({
      next: (updatedTask) => {
        console.log('Mise à jour réussie', updatedTask);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
      }
    });
  }

  // Fonction pour définir la raison sélectionnée par défaut
  setDefaultSelectedReason() {
    if (this.task && this.task.status && this.reasons.length > 0) {
      const matchedReason = this.reasons.find(reason => reason.value === this.task.status);
      if (matchedReason) {
        this.selectedReason = matchedReason.name;
      }
    }
  }

  
}
