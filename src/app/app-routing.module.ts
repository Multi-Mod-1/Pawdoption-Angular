import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogListComponent } from './dog/dog-list/dog-list.component';
import { DogModule } from './dog/dog.module';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: 'dogs', component: DogListComponent},
  {path: 'about', component: AboutComponent},
  { path: '', redirectTo: 'dogs', pathMatch: 'full' },
  { path: '**', redirectTo: 'dogs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DogModule],
  exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }