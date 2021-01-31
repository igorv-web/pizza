import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<IProduct> = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.apiService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (err) => console.log(err)
    );
  }

}
