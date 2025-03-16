import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common'; // à importer

@Component({
  selector: 'app-side-login',
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  email = '';
  password = '';

  isLoading = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('carcare-token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  get f() {
    return this.form.controls;
  }

  submit() : void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true

    const credentials = {
      email: this.form.value.email || '',
      password: this.form.value.password || ''
    }

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Login réussi :', res);
        localStorage.setItem('carcare-token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error(err) {    
        console.error('Erreur de connexion:', err);
      },
      complete : () => {
        this.isLoading = false
      }
    })
  }
}
