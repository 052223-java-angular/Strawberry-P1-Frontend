import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isDropdown: boolean = false;
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (
      this.dropdown && // Add this check
      this.isDropdown &&
      !this.dropdown.nativeElement.contains(event.target)
    ) {
      this.isDropdown = false;
    }
  }

  handleDropdown(): void {
    this.isDropdown = !this.isDropdown;
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    window.sessionStorage.removeItem('auth');
    this.router.navigate(['/']);
  }
}
