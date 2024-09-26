import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductService } from './../../product.service'; 
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  products: any[] = [];
  allProducts: any[] = []; // Store all products for reference
  categories: any[] = [];
  loading: boolean = false;
  loadingCategories: boolean = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.allProducts = data; // Save the original list of products
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    );
  }

  loadCategories(): void {
    this.loadingCategories = true;
    this.productService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        this.loadingCategories = false;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.error = 'Failed to load categories. Please try again later.';
        this.loadingCategories = false;
      }
    );
  }

  onCategorySelect(categorie: string): void {
    console.log(`Selected category: ${categorie}`);

    // Filter products based on selected category
    this.loading = true; // Show loading indicator
    this.productService.getProductsByCategory(categorie).subscribe(
      (data) => {
        this.products = data; // Update displayed products
        this.loading = false; // Hide loading indicator
      },
      (error) => {
        console.error('Error fetching products by category:', error);
        this.error = 'Failed to load products for this category. Please try again later.';
        this.loading = false; // Hide loading indicator
      }
    );
  }

  // Optional: A method to show all products when a clear filter button is clicked
  showAllProducts(): void {
    this.products = this.allProducts; // Reset to the full product list
  }
}
