import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemPayload } from '../models/payloads/cart-item-payload';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = environment.baseUrl + '/cart';
  header = new HttpHeaders().set(
    'auth-token',
    this.auth.getAuth()?.token || ''
  );

  constructor(private http: HttpClient, private auth: AuthService) {}

  add(payload: CartItemPayload): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add`, payload, {
      headers: this.header,
    });
  }
}
