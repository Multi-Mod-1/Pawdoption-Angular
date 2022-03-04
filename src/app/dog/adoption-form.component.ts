import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDog } from './dog';
import { DogService } from './dog.service';

@Component({
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent implements OnInit {
  pageTitle = 'Adoption Form';
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
  }

  onBack(): void {
    const name = String(this.route.snapshot.paramMap.get('id'));
    this.router.navigateByUrl(`/dogs/${name}`);
  }

  onSubmit(): void {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  }
}
