import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { IDog } from "./dog";

@Injectable({
  providedIn: 'root'
})
export class DogService {

  private productUrl = 'api/dogs/dogs.json';

  constructor(private http: HttpClient) { }

  getDogs(): Observable<IDog[]> {
    return this.http.get<IDog[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getDog(id: string): Observable<IDog | undefined> {
    return this.getDogs()
      .pipe(
        map((dogs: IDog[]) => dogs.find(d => d.name === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
