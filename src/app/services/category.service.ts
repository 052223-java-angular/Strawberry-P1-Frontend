import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCategoryByName(name: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/name/${name}`);
  }
}
