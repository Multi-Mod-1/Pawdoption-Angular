import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDog } from '../dog';
import { DogService } from '../dog.service';
import { Meta } from '@angular/platform-browser';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit, OnDestroy {
  pageTitle = 'Dog List';
  showImage = false;
  errorMessage = '';
  sub!: Subscription;
  meta_tag = this.meta.addTag({name:"description", content:"A list of all available dogs at Pawdoption."});  


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

  constructor(private dogService: DogService,
    private meta: Meta,
    public auth: AuthService) {}

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
    this.meta_tag;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}