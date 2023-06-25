import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Auth } from '../models/auth';
import { LoginPayload } from '../models/payloads/login-payload';
import { RegisterPayload } from '../models/payloads/register-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      return true;
    }
    return false;
  }

  getAuth(): Auth | null {
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      return JSON.parse(auth);
    }
    return null;
  }

  login(payload: LoginPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/register`, payload);
  }
}
