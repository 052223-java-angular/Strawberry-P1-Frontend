import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isDropdown: boolean = false;
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (window.sessionStorage.getItem('auth') === 'true') {
      this.isLoggedIn = true;
      console.log('true');
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (
      this.isDropdown &&
      !this.dropdown.nativeElement.contains(event.target as Node)
    ) {
      this.isDropdown = false;
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

  handleDropdown(): void {
    this.isDropdown = !this.isDropdown;
  }
}
