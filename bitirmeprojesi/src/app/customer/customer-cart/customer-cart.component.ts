import { Component, OnInit } from '@angular/core';
import { immediateProvider } from 'rxjs/internal/scheduler/immediateProvider';
import { ProductServiceService } from '../../services/product-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { Cart } from '../../models/cart';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/user-service.service';
import { Product } from '../../models/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent implements OnInit{

  products:Product[] = [];
  currentCart:Cart;
  carts:Cart[] = [];
  currentCustomer:User;
  currentCustomerName = localStorage.getItem("customerName") || "";

  constructor(private productService:ProductServiceService,
    private cartService:CartServiceService,
    private userService:UserServiceService
  ){

  }
  ngOnInit(): void {
      this.setCurrentCustomer();
      this.getProducts();
  }

  addProductToCart(product:Product){
    this.cartService.addProductToCart(this.currentCart.id,product).subscribe(response => {
      console.log("Eklendi");
    })
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(response => {
      this.products = response.data;
    })
  }

  setCurrentCart(){
    this.cartService.getWhereCart(this.currentCustomer.id).subscribe(response => {
      this.currentCart = response.data[0];
      console.log(this.currentCart);
    })
  }

  setCurrentCustomer(){
    this.userService.getWhereUser(this.currentCustomerName).subscribe(response => {
      this.currentCustomer = response.data[0];
      console.log("burada");
      this.setCurrentCart();
    })
  }
}
