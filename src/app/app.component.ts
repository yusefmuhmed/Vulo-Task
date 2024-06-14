import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserTreeComponent } from './user-tree/user-tree.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Vulo-Task';
}
