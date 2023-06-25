import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  dropdown: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (window.sessionStorage.getItem('auth') === 'true') {
      this.isLoggedIn = true;
      console.log('true');
    }
  }

  login(): void {
    this.auth.loginWithRedirect();
    window.sessionStorage.setItem('auth', 'true');
  }

  logout(): void {
    window.sessionStorage.removeItem('auth');
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
}
