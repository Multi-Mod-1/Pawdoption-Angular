import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { DogDetailComponent } from './dog-detail/dog-detail.component';
import { DogListComponent } from './dog-list/dog-list.component';
import { ListShelfComponent } from './list-shelf/list-shelf.component';

@NgModule({
  declarations: [
    DogListComponent,
    ListShelfComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'dogs', component: DogListComponent },
      { path: 'dogs/:id', component: DogDetailComponent},
      { path: 'dogs/:id/form', component: AdoptionFormComponent}
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