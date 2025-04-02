import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from './material.module';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet,
      MaterialModule
    ],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Modernize Angular Admin Tempplate';
}
