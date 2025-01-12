import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user';
import { AuthServiceService } from '../../services/auth-service.service';
import { ReviewServiceService } from '../../services/review-service.service';
import { Review } from '../../models/review';
import { NgFor } from '@angular/common';
import { ToastService } from '../../services/toast-service.service';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [NgFor],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent  implements OnInit{
  currentUser:User
  currentCustomerName = localStorage.getItem("customerName") || "";
  reviews:Review[] = [];
  constructor(private userService:UserServiceService,
    private authService:AuthServiceService,
    private reviewService:ReviewServiceService,
  private toastService:ToastService){
    
  }
  ngOnInit(): void {
      this.getCurrentUser();
  }
  getCurrentUser(){
    this.userService.getWhereUser(this.currentCustomerName).subscribe(response => {
      this.currentUser = response.data[0];
      console.log(this.currentUser.id);
      this.reviewService.getWhereUserIdReview(this.currentUser.id).subscribe(response  => {
        this.reviews = response.data; 
        console.log(this.reviews);
      })
    });
  }
  deleteReview(review:Review){
    this.reviewService.deleteReview(review).subscribe(response => {
      this.toastService.showToast(response.message);
    })
    this.getCurrentUser();
  }
}
