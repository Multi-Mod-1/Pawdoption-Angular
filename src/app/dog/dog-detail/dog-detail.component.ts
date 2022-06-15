import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDog } from "../dog";
import { DogService } from "../dog.service";
import { Meta, SafeUrl } from "@angular/platform-browser";
import { AuthService } from "@auth0/auth0-angular";
import { catchError, map, tap } from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from "../../token.service";

@Component({
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})

export class DogDetailComponent implements OnInit {
  pageTitle = 'Dog Detail';
  errorMessage = '';
  dog!: IDog;
  meta_tag = this.meta.addTag({name:"description", content:"Information and details about a single dog."});  
  userEmail!: string | undefined;
  dogEmail!: string;
  // img!: SafeUrl;


  private dogUrl = 'http://localhost:3000/api/dogs';
  myToken!: String;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dogService: DogService,
              public auth: AuthService, 
              private http: HttpClient,
              private token: TokenService,
              private meta: Meta,
              private sanitizer: DomSanitizer) {
  }
  
  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.getDog(id);
        this.getUser();
      }
      this.meta_tag;
      

  }

  getDog(id: number): void {
    this.dogService.getDog(id).subscribe({
      next: data => {
      this.dog = data;
      this.dogEmail = data.User.email;
      // console.log("!!!!!!"  + data.imageURL.size)
      // const objectURL = 'data:image/jpeg;base64,' + data.imageURL;
      //    this.img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      // const objectURL = URL.createObjectURL(data.imageURL);
      // const img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      // this.img = img;
      }
    })
  }

  getUser(): void {
    this.auth.user$.subscribe({
      next: data => {
        this.userEmail = data?.email
        // console.log(data);
      }
    })
  }

  onBack(): void {
    this.router.navigate(['/dogs']);
  }

  toForm(): void {
    const name = String(this.route.snapshot.paramMap.get('id'));
    this.router.navigateByUrl(`/dogs/${name}/form`);
  }

  removeDog(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.token.getToken().subscribe({
        next: data => {
          this.myToken = data;
          return this.http.delete(`${this.dogUrl}/${id}`, {
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this.myToken}`)
            .set('content-type', 'application/json')
          }).subscribe({
                next: moreData => {
                    console.log('Delete successful');
                    this.router.navigateByUrl('/dogs')
                },
                error: error => {
                    console.error('There was an error!', error);
                }
              });
        }
      })

    }
  }

}