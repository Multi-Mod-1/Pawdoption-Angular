import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { TokenService } from "../token.service";
import { IDog } from "./dog";

export interface Dog {
  id: number
  name: string
  sex: string
  age: number
  breed: string
  summary: string
  description: string
  imageURL: string
  LocationId: number
  UserId: number
}

@Injectable({
  providedIn: 'root'
})
export class DogService {

  private dogUrl = 'http://localhost:3000/api/dogs';
  myToken!: String;

  // private dogUrl = '../assets/dogs/dogs.json';
  constructor(private http: HttpClient,
    private token: TokenService) { }

  getDogs(): Observable<IDog[]> {
    return this.http.get<IDog[]>(this.dogUrl)
      // .pipe(
      //   tap(data => console.log('All: ', JSON.stringify(data))),
      //   catchError(this.handleError)
      // );
  }

  getDog(id: number): Observable<IDog> {
    return this.http.get<IDog>(`${this.dogUrl}/${id}`)
      // .pipe(
      //   map((dogs: IDog[]) => dogs.find(d => d.name === id))
      // );
            .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteDog(id: number): void {
    this.token.getToken().subscribe({
      next: data => {
        this.myToken = data;
        return this.http.delete(`${this.dogUrl}/${id}`, {
          headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.myToken}`)
          .set('content-type', 'application/json')
        }).subscribe({
              next: data => {
                  console.log('Delete successful');
              },
              error: error => {
                  console.error('There was an error!', error);
              }
            });
      }
    })
  }

  postDog(dog: Dog): Observable<Dog> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(dog);
    console.log(body)
    return this.http.post<Dog>(`${this.dogUrl}`, body, {'headers':headers})
    // .subscribe(result => { console.log("Posted" + JSON.stringify(result)); }, error => console.error(error));       
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
