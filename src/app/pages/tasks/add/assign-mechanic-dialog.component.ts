import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
    imports: [
        MatDialogModule,  // Ajoute MatDialogModule ici
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule
        // autres modules Angular Material et ton module
      ],
  selector: 'app-assign-mechanic-dialog',
  templateUrl: './assign-mechanic-dialog.component.html',
})
export class AssignMechanicDialogComponent {
  mechanics: any[] = [];
  selectedMechanic: any;

  constructor(
    public dialogRef: MatDialogRef<AssignMechanicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.loadMechanics();
  }

  loadMechanics() {
    this.userService.getMechanics().subscribe(data => {
      this.mechanics = data;
    });
  }

  assignMechanic() {
    if (this.selectedMechanic) {
      // Assigner le mécanicien au service
      console.log('Mécanicien assigné:', this.selectedMechanic);
      this.snackBar.open('Mécanicien assigné avec succès', '', { duration: 2000 });
      this.dialogRef.close(this.selectedMechanic);
    } else {
      this.snackBar.open('Veuillez sélectionner un mécanicien', '', { duration: 2000 });
    }
  }
}
