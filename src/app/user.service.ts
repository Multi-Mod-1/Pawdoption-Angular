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

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${email}`)
        .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
      );
  }
}
