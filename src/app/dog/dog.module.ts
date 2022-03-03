import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DogListComponent } from './dog-list.component';

@NgModule({
  declarations: [
    DogListComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'dogs', component: DogListComponent },
      // {
      //   path: 'products/:id',
      //   canActivate: [ProductDetailGuard],
      //   component: ProductDetailComponent
      // }
    ]),
    FormsModule
  ]
})
export class DogModule { }