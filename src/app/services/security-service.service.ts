import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private auth: AuthService) { }

  public login(): void {
    this.auth.loginWithRedirect();
  }
}
