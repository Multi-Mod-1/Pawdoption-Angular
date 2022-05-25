import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-navaiagation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  title = 'Pawdoption';
  // constructor(public auth: AuthService) {}

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

}
