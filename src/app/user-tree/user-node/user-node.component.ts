import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface User {
  name: string;
  code: string;
  imagePath: string;
}

interface TreeNode {
  user: User | null;
  children: { [key: string]: TreeNode };
}

@Component({
  selector: 'app-user-node',
  imports:[CommonModule],
  templateUrl: './user-node.component.html',
  styleUrls: ['./user-node.component.css'],
  standalone: true
})
export class UserNodeComponent {
  @Input() node!: TreeNode;
  @Input() path!: string;

  getChildren(node: TreeNode): { path: string; node: TreeNode }[] {
    return Object.entries(node.children).map(([key, child]) => ({
      path: this.path + key,
      node: child
    }));
  }

 

}
