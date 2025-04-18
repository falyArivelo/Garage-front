import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  imports: [RouterModule],
  template: `
  <a [routerLink]="['/']">
    <img src="./assets/images/logos/variant1.png" class="align-middle m-2" alt="logo" style="width: 180px; height: auto;" />
  </a>
  `
})
export class BrandingComponent {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {} 
}
