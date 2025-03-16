import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common'; // à importer

@Component({
  selector: 'app-side-register',
  imports: [CommonModule,RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent  implements OnInit{
  options = this.settings.getOptions();
  isLoading = false;

  constructor(private settings: CoreService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('carcare-token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(3)]),
    // confirmPassword: new FormControl('', [Validators.required])
  });


  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true

    const userData = {
      username: this.form.value.username || '',
      email: this.form.value.email || '',
      password: this.form.value.password || ''
    }

    this.authService.signup(userData).subscribe({
      next: (res) => {
        console.log('Inscription réussi :', res);
        this.router.navigate(['/authentication/login']);
      },
      error(err) {
        console.error('Erreur d inscription :', err);
        // tu peux aussi afficher un message d'erreur ici
      },
      complete : () => {
        this.isLoading = false
      }
    })
    
  }
}
