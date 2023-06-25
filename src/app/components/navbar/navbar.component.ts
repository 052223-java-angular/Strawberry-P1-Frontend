import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userDropdown: boolean = false;
  shopDropdown: boolean = false;
  @ViewChild('userDropdownRef') userDropdownRef!: ElementRef;
  @ViewChild('shopDropdownRef') shopDropdownRef!: ElementRef;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (
      this.userDropdownRef &&
      this.userDropdown &&
      !this.userDropdownRef.nativeElement.contains(event.target)
    ) {
      this.userDropdown = false;
    }

    if (
      this.shopDropdownRef &&
      this.shopDropdown &&
      !this.shopDropdownRef.nativeElement.contains(event.target)
    ) {
      this.shopDropdown = false;
    }
  }

  handleUserDropdown(): void {
    this.userDropdown = !this.userDropdown;
  }

  handleShopDropdown(): void {
    this.shopDropdown = !this.shopDropdown;
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    window.sessionStorage.removeItem('auth');
    this.router.navigate(['/']);
  }

  getAuth(): Auth | null {
    return this.auth.getAuth();
  }
}
