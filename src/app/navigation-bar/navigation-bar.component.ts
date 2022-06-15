import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Router } from "@angular/router";
import { UserService } from '../user.service';


@Component({
  selector: 'app-navaiagation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  title = 'Pawdoption';
  userEmail!: string | undefined;
  userAuth: any;
  // constructor(public auth: AuthService) {}

  constructor(@Inject(DOCUMENT) 
  public document: Document, 
  public auth: AuthService, 
  private router: Router, 
  private userService: UserService) {}

  toLogin(): void {
    this.router.navigate(['/login'])
  }

  toProfile(): void {
    this.auth.user$.subscribe({
      next: data => {
        if (data?.email) {
          console.log(data.email);
          this.userService.getUserByEmail(data.email).subscribe(
            dbUser => this.router.navigate([`/user/${dbUser.id}`])
          )
        }
      }
    })
    // this.auth.user$.subscribe(
    //   data => this.router.navigate([`/user/${data?.id}`])
    // )
  }
}
