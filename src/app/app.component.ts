import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserTreeComponent } from './user-tree/user-tree.component';
import { UserNodeComponent } from './user-tree/user-node/user-node.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserTreeComponent, UserNodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Vulo-Task';
}
