import { Component, OnInit } from '@angular/core';
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
  imports:[UserNodeComponent,CommonModule,HttpClientModule],
  selector: 'app-user-tree',
  templateUrl: './user-tree.component.html',
  styleUrls: ['./user-tree.component.css'],
  providers: [
    UserService
  ],
  standalone: true
})
export class UserTreeComponent implements OnInit {
  users: User[] = [];
  tree: TreeNode = { user: null, children: {} };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.buildTree();
    });
  }

  buildTree(): void {
    this.users.forEach(user => {
      const parts = user.code.split('.');
      let currentLevel = this.tree;

      parts.forEach((part, index) => {
        if (!currentLevel.children[part]) {
          currentLevel.children[part] = { user: null, children: {} };
        }

        if (index === parts.length - 1) {
          currentLevel.children[part].user = user;
        }

        currentLevel = currentLevel.children[part];
      });
    });
  }
}
