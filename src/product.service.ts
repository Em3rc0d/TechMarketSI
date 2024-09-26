import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://fakestoreapi.com/products';
  private cartUrl = 'https://fakestoreapi.com/carts';
  private userUrl = 'https://fakestoreapi.com/users';
  private authUrl = 'https://fakestoreapi.com/auth';

  constructor(private http: HttpClient) {}

  // Products
  getAllProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getSingleProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getProductsWithLimit(limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?limit=${limit}`);
  }

  getSortedProducts(order: 'asc' | 'desc'): Observable<any> {
    return this.http.get(`${this.baseUrl}?sort=${order}`);
  }

  getTopCheapestProducts(limit: number = 5): Observable<any> {
    return this.http.get(`${this.baseUrl}?sort=asc&limit=${limit}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${category}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  patchProduct(id: number, product: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Carts
  getAllCarts(): Observable<any> {
    return this.http.get(this.cartUrl);
  }

  getSingleCart(id: number): Observable<any> {
    return this.http.get(`${this.cartUrl}/${id}`);
  }

  getCartsWithLimit(limit: number): Observable<any> {
    return this.http.get(`${this.cartUrl}?limit=${limit}`);
  }

  getCartsSorted(order: 'asc' | 'desc'): Observable<any> {
    return this.http.get(`${this.cartUrl}?sort=${order}`);
  }

  getUserCarts(userId: number): Observable<any> {
    return this.http.get(`${this.cartUrl}/user/${userId}`);
  }

  addCart(cart: any): Observable<any> {
    return this.http.post(this.cartUrl, cart);
  }

  updateCart(id: number, cart: any): Observable<any> {
    return this.http.put(`${this.cartUrl}/${id}`, cart);
  }

  deleteCart(id: number): Observable<any> {
    return this.http.delete(`${this.cartUrl}/${id}`);
  }

  // Users
  getAllUsers(): Observable<any> {
    return this.http.get(this.userUrl);
  }

  getSingleUser(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.userUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.userUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.userUrl}/${id}`);
  }

  // Authentication
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, { username, password });
  }
}
