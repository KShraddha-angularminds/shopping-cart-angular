import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  orderedProducts: any[] = JSON.parse(localStorage.getItem('products')!) || [];
  placeOrder: any = FormGroup;
  constructor(private fb: FormBuilder) {}
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
  ngOnInit(): void {
    this.placeOrder = this.fb.group({
      personName: [''],
      deliveryAddress: [''],
      productsOrdered: this.fb.array([]),
    });
  }
}
