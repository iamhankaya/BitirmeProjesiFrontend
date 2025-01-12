import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrderServiceService } from '../../services/order-service.service';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/user-service.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-customer-myorders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './customer-myorders.component.html',
  styleUrl: './customer-myorders.component.css'
})
export class CustomerMyordersComponent implements OnInit{
  orders:Order[] = [];
  currentCustomerName = localStorage.getItem("customerName") || "";
  currentCustomer:User;
  products:Product[] = [];
  constructor(private orderService:OrderServiceService,
    private userService: UserServiceService
  ){}
  ngOnInit(): void {
      this.getCurrentUser();
  }
  getOrders(){
    this.orderService.getWhereOrder(this.currentCustomer.id).subscribe(response => {
      this.orders = response.data;
      this.orders.forEach(order => {
        this.products = order.products;  
      })
      console.log(this.orders);
    })
  }
  getCurrentUser(){
    this.userService.getWhereUser(this.currentCustomerName).subscribe(response => {
      this.currentCustomer = response.data[0];
      this.getOrders();
    })
  }
}
