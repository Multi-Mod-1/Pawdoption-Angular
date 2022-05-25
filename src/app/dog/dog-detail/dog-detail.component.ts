import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDog } from "../dog";
import { DogService } from "../dog.service";
import { Meta } from "@angular/platform-browser";

@Component({
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})

export class DogDetailComponent implements OnInit {
  pageTitle = 'Dog Detail';
  errorMessage = '';
  dog: IDog | undefined;
  meta_tag = this.meta.addTag({name:"description", content:"Information and details about a single dog."});  

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dogService: DogService,
              private meta: Meta) {
  }
  
  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.getDog(id);
      }
      this.meta_tag;
  }

  getDog(id: number): void {
    this.dogService.getDog(id).subscribe({
      next: dog => this.dog = dog,
      error: err => this.errorMessage = err
    });
    console.log("Yooooooo!")
  }

  onBack(): void {
    this.router.navigate(['/dogs']);
  }

  toForm(): void {
    const name = String(this.route.snapshot.paramMap.get('id'));
    this.router.navigateByUrl(`/dogs/${name}/form`);
  }

}