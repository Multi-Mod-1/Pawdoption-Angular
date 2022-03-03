import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DogListComponent } from './dog/dog-list.component';

const routes: Routes = [
  {path: 'dogs', component: DogListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FormsModule, CommonModule]
})
export class AppRoutingModule { }
