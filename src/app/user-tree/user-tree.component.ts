import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { UserNodeComponent } from './user-node/user-node.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [UserNodeComponent, CommonModule, HttpClientModule],
  selector: 'app-user-tree',
  templateUrl: './user-tree.component.html',
  styleUrls: ['./user-tree.component.css'],
  providers: [UserService],
  standalone: true
})
export class UserTreeComponent implements OnInit {
  users: User[] = [];
  tree: TreeNode = { user: null, children: {} };
  visibleNodes: { [key: string]: boolean } = {};

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.buildTreeWithDelay();
    });
  }

  buildTreeWithDelay(): void {
    let index = 0;

    const addNextNode = () => {
      if (index >= this.users.length) {
        return;
      }

      const user = this.users[index];
      const parts = user.code.split('.');
      let currentLevel = this.tree;
      let path = '';

      parts.forEach((part, idx) => {
        path += part;
        if (!currentLevel.children[part]) {
          currentLevel.children[part] = { user: null, children: {} };
        }

        if (idx === parts.length - 1) {
          currentLevel.children[part].user = user;
          this.visibleNodes[path] = true;
        }

        currentLevel = currentLevel.children[part];
      });

      index++;
      this.cdr.detectChanges();
      setTimeout(addNextNode, 1000); // Adjust the delay here
    };

    addNextNode();
  }

  isVisible(path: string): boolean {
    return this.visibleNodes[path];
  }
}
