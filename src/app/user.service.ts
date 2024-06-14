// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  name: string;
  code: string;
  imagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('../../users.json').pipe(
      map(users => this.sortUsers(users))
    );
  }

  private sortUsers(users: User[]): User[] {
    return users.sort((a, b) => a.code.localeCompare(b.code));
  }
}
