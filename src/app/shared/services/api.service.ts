import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlCategory: string;
  private urlProduct: string;
  constructor(private http: HttpClient) {
    this.urlCategory = 'http://localhost:3000/categories';
    this.urlProduct = 'http://localhost:3000/products';
  }

  getCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.urlCategory);
  }

  postCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.urlCategory, category);
  }

  deleteCategory(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.urlCategory}/${id}`);
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.urlCategory}/${category.id}`, category);
  }

  getProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.urlProduct);
  }

  postProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.urlProduct, product);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.urlProduct}/${id}`);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.urlProduct}/${product.id}`, product);
  }
}
