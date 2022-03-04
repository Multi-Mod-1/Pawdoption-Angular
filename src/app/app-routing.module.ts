import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogListComponent } from './dog/dog-list.component';
import { DogModule } from './dog/dog.module';
import { WelcomeComponent } from './home/welcome.compnent';

const routes: Routes = [
<<<<<<< HEAD
  // {path: 'form', component: AdoptionFormComponent},
=======
  {path: 'dogs', component: DogListComponent},
  {path: 'welcome', component: WelcomeComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
>>>>>>> ab0ae0d613925f5b89780dcdfa622f14540b1a9d
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DogModule],
  exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }
