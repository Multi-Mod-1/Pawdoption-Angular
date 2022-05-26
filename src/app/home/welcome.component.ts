import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '@auth0/auth0-angular';

@Component({
  styleUrls: ['./welcome.component.css'],
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  public pageTitle = 'Welcome';

  navbarItem: HTMLCollectionOf<HTMLElement> | undefined;

  constructor(private router: Router,
    public auth: AuthService) {}

  getNavBar(): void {
    this.navbarItem = document.getElementsByTagName("app-navaiagation-bar") as HTMLCollectionOf<HTMLElement>;
  }

  ngOnInit(): void {
    this.getNavBar();
    if (this.navbarItem != undefined) {
      this.navbarItem[0].style.display = "none";
    }
  }

  // loginWithRedirect(): void {
  //   this.auth.loginWithRedirect();
  // }

  toHome(): void {
    this.router.navigate(['/dogs']);
    if (this.navbarItem != undefined) {
      this.navbarItem[0].style.display = "block";
    }
  }
}