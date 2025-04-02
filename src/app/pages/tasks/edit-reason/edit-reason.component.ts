import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ThemePalette } from '@angular/material/core';
import {
  ChangeDetectionStrategy,
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
    MaterialModule
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

  reasons = [
    { name: 'Travail en cours', value: 'En cours', color: 'primary' },
    { name: 'Terminé', value: 'Terminé', color: 'accent' },
    { name: 'Annuler', value: 'Annulé', color: 'danger' },
    { name: 'Pièces manquantes', value: 'En attente', color: 'warn' },
    { name: 'Problème technique', value: 'En attente', color: 'warn' },
    { name: 'Changement de priorité', value: 'En attente', color: 'warn' },
    { name: 'Absence du mécanicien', value: 'En attente', color: 'danger' }
  ];

  selectedReason: string = '';
  message: string = '';
  currentDateTime: string = new Date().toISOString().slice(0, 16); // Format YYYY-MM-DDTHH:mm
  sendMail: boolean = false;

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

}
