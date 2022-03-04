import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogListComponent } from './dog/dog-list.component';
import { DogModule } from './dog/dog.module';
import { WelcomeComponent } from './home/welcome.compnent';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dogs', component: DogListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DogModule],
  exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }
