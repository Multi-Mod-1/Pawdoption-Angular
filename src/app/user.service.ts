import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${userId}`)
        .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
      );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/email/${email}`)
        .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
      );
  }
}
