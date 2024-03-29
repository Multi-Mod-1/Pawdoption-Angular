import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogListComponent } from './dog/dog-list/dog-list.component';
import { DogModule } from './dog/dog.module';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './home/welcome.component';
import { UserComponent } from './user/user.component';
import { UploadDogComponent } from './dog/upload-dog/upload-dog.component';

const routes: Routes = [
  // {path: '', component: WelcomeComponent},
  {path: '', component: DogListComponent},
  {path: 'dogs', component: DogListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user/:userId', component: UserComponent},
  {path: 'user/:userId/upload', component: UploadDogComponent},
  // { path: '', redirectTo: 'dogs', pathMatch: 'full' },
  { path: '**', redirectTo: 'dogs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DogModule],
  exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }