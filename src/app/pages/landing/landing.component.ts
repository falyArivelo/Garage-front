import { Component } from '@angular/core';
import { AppTopstripComponent } from 'src/app/layouts/full/top-strip/topstrip.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Service } from '../services/service';
import { RouterModule } from '@angular/router';
// import { HowItWorksComponent } from './how-it-works/how-it-works.component';
// import { MatDialog } from '@angular/material/dialog';

// card 2
interface cardimgs {
  id: number;
  time: string;
  imgSrc: string;
  user: string;
  title: string;
  views: string;
  category: string;
  comments: number;
  date: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterModule,AppTopstripComponent,MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule,
    // MatDialog
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  standalone: true,
})
export class LandingComponent {
  constructor() {}

  // openServiceModal(): void {
  //   this.dialog.open(HowItWorksComponent, {
  //     width: '400px',
  //     data: {} // tu peux passer des données ici si tu veux
  //   });
  // }

  services: Service[] = [
    {
      _id: '1',
      name: 'Réparation et Entretien Mécanique Général',
      category: 'Réparation',
      description: 'Réparations sur le moteur, transmission, suspension, freins, etc. L\'entretien garantit la sécurité et la longévité du véhicule.',
      price: 200,
      estimatedDuration: 4,
      availability: true,
      piece: 'Moteur, Transmission, Freins',
      image: '/assets/images/blog/blog-img1.jpg',
    },
    {
      _id: '2',
      name: 'Service de Pneumatiques',
      category: 'Entretien',
      description: 'Services de montage, démontage, équilibrage et réparation des pneus pour garantir une conduite stable et éviter les accidents.',
      price: 100,
      estimatedDuration: 1,
      availability: true,
      piece: 'Pneus',
      image: '/assets/images/blog/blog-img1.jpg',
    },
    {
      _id: '3',
      name: 'Diagnostic Électronique',
      category: 'Diagnostic',
      description: 'Détection rapide des problèmes grâce à un diagnostic électronique, permettant d\'éviter des réparations inutiles et coûteuses.',
      price: 80,
      estimatedDuration: 1.5,
      availability: true,
      piece: 'Système électronique',
      image: '/assets/images/blog/blog-img1.jpg',
    },
    {
      _id: '4',
      name: 'Service de Freins',
      category: 'Réparation',
      description: 'Inspection, remplacement des plaquettes, disques de frein et purge du liquide de frein pour garantir des distances de freinage optimales.',
      price: 120,
      estimatedDuration: 2,
      availability: true,
      piece: 'Freins, Plaquettes',
      image: '/assets/images/blog/blog-img1.jpg',
    },
    {
      _id: '5',
      name: 'Peinture et Carrosserie',
      category: 'Réparation',
      description: 'Réparation de la carrosserie pour protéger le véhicule contre la rouille et maintenir sa valeur, en plus de l\'esthétique.',
      price: 350,
      estimatedDuration: 5,
      availability: true,
      piece: 'Carrosserie, Peinture',
      image: '/assets/images/blog/blog-img1.jpg',
    },
    
  ];
}
