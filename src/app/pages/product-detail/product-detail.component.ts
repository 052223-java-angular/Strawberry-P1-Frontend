import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItemPayload } from 'src/app/models/payloads/cart-item-payload';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: string = '';
  product!: Product | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private auth: AuthService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id') || '';

      this.productService.getProductById(this.productId).subscribe({
        next: (resp: Product) => {
          this.product = resp;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  addToCart(): void {
    const payload: CartItemPayload = {
      quantity: 1,
      price: this.product?.price || 0,
      productId: this.productId,
      userId: this.auth.getAuth()?.id || '',
    };

    this.cartService.add(payload).subscribe({
      next: (resp) => {
        this.toastr.success('Product added to cart');
      },
      error: (err) => {
        this.toastr.error('Error adding product to cart');
        console.log(err);
      },
    });
  }
}
