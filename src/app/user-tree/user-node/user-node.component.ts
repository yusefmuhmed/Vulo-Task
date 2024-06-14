
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-node',
  templateUrl: './user-node.component.html',
  styleUrls: ['./user-node.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class UserNodeComponent implements OnInit {
  @Input() node: any;

  constructor() { }

  ngOnInit(): void {
  }

  getChildren(node: any): any[] {
    return Object.keys(node.children).map(key => node.children[key]);
  }
}
