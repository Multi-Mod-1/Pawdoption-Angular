import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDog } from "../dog";
import { DogService } from "../dog.service";
import { Meta } from "@angular/platform-browser";
import { AuthService } from "@auth0/auth0-angular";
import { catchError, map, tap } from "rxjs";
import { Subscription } from "rxjs";

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dogService: DogService,
              public auth: AuthService, 
              private meta: Meta) {
  }
  
  async ngOnInit(): Promise<void> {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        await this.getDog(id);
        console.log("waited for dog: " + this.dogEmail)
        await this.getUser();
        console.log("waited for user: " + this.userEmail)
        await this.showButton(this.dogEmail, this.userEmail);
      }
      this.meta_tag;
      
      // console.log(document.getElementById("deleteDog"));
      // <div *ngIf="auth.isAuthenticated$ | async">
      //   <button (click)="removeDog()">Delete This Dog</button>
      // </div>
  }

  async getDog(id: number): Promise<void> {
    this.dogService.getDog(id).subscribe({
      next: data => {
      this.dog = data;
      this.dogEmail = data.User.email;
      }
    })
    console.log("got id: " + id)
  }

  async getUser(): Promise<void> {
    this.auth.user$.subscribe({
      next: data => {
        this.userEmail = data?.email
      }
    })
  }

  async showButton(de: string, ue: string | undefined): Promise<void> {
    if (de && ue) {
      console.log("BOOM " + de + " " + ue);
    }
  }

  onBack(): void {
    this.router.navigate(['/dogs']);
  }

  toForm(): void {
    const name = String(this.route.snapshot.paramMap.get('id'));
    this.router.navigateByUrl(`/dogs/${name}/form`);
  }

  removeDog(): void {
    
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // if (id) {
    //   this.dogService.deleteDog(id);
    //   this.router.navigateByUrl('/dogs')
    //   .then(() => {
    //     // window.location.reload();
    //   });
    // }
  }

}