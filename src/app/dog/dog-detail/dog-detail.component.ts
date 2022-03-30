import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDog } from "../dog";
import { DogService } from "../dog.service";

@Component({
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})

export class DogDetailComponent implements OnInit {
  pageTitle = 'Dog Detail';
  errorMessage = '';
  dog: IDog | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dogService: DogService) {
  }
  
  ngOnInit(): void {
      const id = String(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.getDog(id);
      }
  }

  getDog(id: string): void {
    this.dogService.getDog(id).subscribe({
      next: dog => this.dog = dog,
      error: err => this.errorMessage = err
    });
    console.log(this.dog)
  }

  onBack(): void {
    this.router.navigate(['/dogs']);
  }

  toForm(): void {
    const name = String(this.route.snapshot.paramMap.get('id'));
    this.router.navigateByUrl(`/dogs/${name}/form`);
  }

}