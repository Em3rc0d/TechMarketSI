import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductService } from './../../product.service'; 
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-best-p',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './best-p.component.html',
  styleUrls: ['./best-p.component.css']
})
export class BestPComponent implements OnInit {
  products: any[] = [];
  allProducts: any[] = []; // To hold all products
  loading: boolean = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.allProducts = data; // Save the original list of products
        this.products = this.getTopCheapestProducts(this.allProducts, 5); // Get top 5 cheapest
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    );
  }

  getTopCheapestProducts(products: any[], limit: number): any[] {
    return products
      .sort((a, b) => a.price - b.price) // Sort products by price in ascending order
      .slice(0, limit); // Take the top 'limit' products
  }
}
