import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDog } from './dog';
import { DogService } from './dog.service';

@Component({
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit, OnDestroy {
  pageTitle = 'Dog List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDogs = this.performFilter(value);
  }

  filteredDogs: IDog[] = [];
  dogs: IDog[] = [];  

  constructor(private dogService: DogService) {}

  performFilter(filterBy: string): IDog[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.dogs.filter((dog: IDog) =>
      dog.name.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.dogService.getDogs().subscribe({
      next: dogs => {
        this.dogs = dogs;
        this.filteredDogs = this.dogs;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
