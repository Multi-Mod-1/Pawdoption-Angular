import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from "@angular/common/http";
import { Subscription } from 'rxjs';
import { TokenService } from '../token.service';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  sub!: Subscription;
  token: String | undefined;
  userDB!: User;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService, 
    private tokenService: TokenService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUserToken(): void {
    this.sub = this.tokenService.getToken().subscribe({
      next: data => {
        this.token = data;
      }
    })
    const newLocal = this.document.getElementById('tokenAll')
    if (newLocal) {
      newLocal.style.visibility = "visible";
    }
  }

  getUser(): void {
    const email = String(this.route.snapshot.paramMap.get('email'));
    this.userService.getUserByEmail(email).subscribe(
      data => this.userDB = data
    )
  }

  toUploadForm(): void {
    this.router.navigateByUrl(`/user/${this.userDB.email}/upload`);
  }

  copyToClipboard(el: HTMLDivElement) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(el.innerText).then(() => {
        alert('Copied to Clipboard')
      }, (error) => {
        console.log(error)
      });
    } else {
      console.log('Browser do not support Clipboard API')
    }
  }

}
