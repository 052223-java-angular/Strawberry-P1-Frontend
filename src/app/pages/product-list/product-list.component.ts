import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  category!: Category | null;
  productName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productName = params.get('name') || '';

      this.categoryService.getCategoryByName(this.productName).subscribe({
        next: (resp) => {
          this.category = resp;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
}
