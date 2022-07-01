import { Component, OnInit } from '@angular/core';
import { ProductAPIService } from '../services/product-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private productApi: ProductAPIService) {}
  allProducts: any[] = [];
  cartProducts: any[] = JSON.parse(localStorage.getItem('products')!) || [];
  itemPerPage = 5;
  showButton = false;
  baseURL = 'http://interviewapi.ngminds.com';

  setProductPerPage(e: any) {
    this.itemPerPage = e.target.value;
  }
  sortProducts(e: any) {
    switch (e.target.value) {
      case '':
        this.productApi
          .getAllProducts()
          .subscribe((products) => (this.allProducts = products.products));
        break;
      case 'High to Low':
        this.allProducts = this.allProducts.sort((a, b) =>
          parseInt(a.price) < parseInt(b.price) ? 1 : -1
        );

        break;
      case 'Low to High':
        this.allProducts = this.allProducts.sort((a, b) =>
          parseInt(a.price) > parseInt(b.price) ? 1 : -1
        );
        break;
    }
  }
  showButtonHandler(product: any) {
    this.showButton = this.cartProducts.find((prod) => prod._id == product._id);
    return this.showButton;
  }
  addToCart(product: any) {
    this.cartProducts.push(product);
    localStorage.setItem('products', JSON.stringify(this.cartProducts));
  }
  ngOnInit(): void {
    this.productApi
      .getAllProducts()
      .subscribe((products) => (this.allProducts = products.products));
  }
}
// (this.allProducts = products)
