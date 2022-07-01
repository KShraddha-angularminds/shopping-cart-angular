import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor() {}
  quantity: any[] = [1, 1, 1];
  baseURL = 'http://interviewapi.ngminds.com';
  cartProducts: any[] = JSON.parse(localStorage.getItem('products')!) || [];
  totalAmount = 0;
  increment(i: any) {
    this.quantity.splice(i, 1, this.quantity[i] + 1);
    this.totalAmount = this.totalAmount + parseInt(this.cartProducts[i].price);
  }
  decrement(i: any) {
    if (this.quantity[i] > 1) {
      this.quantity.splice(i, 1, this.quantity[i] - 1);
      this.totalAmount =
        this.totalAmount - parseInt(this.cartProducts[i].price);
    }
  }
  removeProduct(i: any) {
    this.cartProducts.splice(i, 1);
    localStorage.setItem('products', JSON.stringify(this.cartProducts));
    this.totalAmount = 0;
    this.cartProducts.map((product, index) => {
      this.totalAmount =
        this.totalAmount +
        parseInt(product.price) * parseInt(this.quantity[index]);
    });
  }
  addQuantity() {
    this.cartProducts.map((prod, index) => {
      prod.quantity = this.quantity[index];
    });
    localStorage.setItem('products', JSON.stringify(this.cartProducts));
  }
  ngOnInit(): void {
    console.log(this.cartProducts);
    console.log(this.quantity);
    this.cartProducts.map((product) => {
      this.totalAmount = this.totalAmount + parseInt(product.price);
    });
  }
}
