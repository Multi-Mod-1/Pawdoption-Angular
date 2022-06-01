import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  url: string = 'https://dev-599761cp.us.auth0.com/oauth/token';

  constructor(private http: HttpClient) { }

  getToken(): Observable<String> {
    return this.http.get<String>(`http://localhost:3000/api/token`)
  }
}
