import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DogDetailComponent } from './dog-detail.component';
import { DogListComponent } from './dog-list.component';

@NgModule({
  declarations: [
    DogListComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'dogs', component: DogListComponent },
      { path: 'dogs/:id', component: DogDetailComponent}
      // {
      //   path: 'products/:id',
      //   canActivate: [ProductDetailGuard],
      //   component: ProductDetailComponent
      // }
    ]),
    FormsModule,
    CommonModule,
    BrowserModule
  ]
})
export class DogModule { }