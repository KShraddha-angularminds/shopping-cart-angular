import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductAPIService } from '../services/product-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  orderedProducts: any[] = JSON.parse(localStorage.getItem('products')!) || [];
  placeOrder: any = FormGroup;
  constructor(
    private fb: FormBuilder,
    private productAPI: ProductAPIService,
    private router: Router
  ) {}
  calculateTotQuantity() {
    let totalQuantity = 0;
    this.orderedProducts.map(
      (prod) => (totalQuantity = totalQuantity + prod.quantity)
    );
    return totalQuantity;
  }

  calculateTotal() {
    let total = 0;
    this.orderedProducts.map(
      (prod) => (total = total + prod.quantity * prod.price)
    );
    return total;
  }
  submitOrder() {
    console.log(this.placeOrder.value);
    this.productAPI
      .postProduct(this.placeOrder.value)
      .subscribe((res) => this.router.navigate(['/success', res.data._id]));
  }
  get personName() {
    return this.placeOrder.get('personName');
  }

  get deliveryAddress() {
    return this.placeOrder.get('deliveryAddress');
  }

  ngOnInit(): void {
    let arr: any = [];
    this.orderedProducts.map((prod: any) => {
      arr.push({
        productID: prod._id,
        qty: prod.quantity,
        price: prod.price,
        total: prod.quantity * parseInt(prod.price),
      });
    });

    this.placeOrder = this.fb.group({
      personName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      productsOrdered: this.fb.array(arr),
    });
  }
}
