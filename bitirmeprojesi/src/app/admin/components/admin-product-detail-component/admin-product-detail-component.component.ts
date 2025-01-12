import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { User } from '../../../models/user';
import { Review } from '../../../models/review';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ProductServiceService } from '../../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../services/user-service.service';
import { ReviewServiceService } from '../../../services/review-service.service';
import { ToastService } from '../../../services/toast-service.service';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-admin-product-detail-component',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './admin-product-detail-component.component.html',
  styleUrl: './admin-product-detail-component.component.css'
})
export class AdminProductDetailComponentComponent {
   currentProduct:Product[] = [];
    currentUser:User[] = [];
    currentUserName = localStorage.getItem("customerName") || "";
    currentProductId:Number;
    reviewForm:FormGroup;
    review:Review;
    productReviews:Review[] = [];
    constructor(private productService:ProductServiceService,
      private activatedRoute: ActivatedRoute,
      private formBuilder:FormBuilder,
      private userService:UserServiceService,
      private reviewService:ReviewServiceService,
      private toastService:ToastService
    ){
  
    }
    ngOnInit(): void {
      this.setCurrentProduct();
      this.getCurrentUser();
    }
  
    showToast(message:string) {
      this.toastService.showToast(message);
    }
  
    setCurrentProduct() {
      this.getProductId();
      this.getReviews();
      this.productService.getSingleProduct(this.currentProductId).subscribe(response => {
        this.currentProduct = Array.isArray(response.data) ? response.data : [response.data];
        console.log(this.currentProduct);
      });
    }
    
    getProductId() {
      this.activatedRoute.params.subscribe(params => {
        console.log(params);
        this.currentProductId = Number(params["productId"]);
        console.log(this.currentProductId);
      });
    }
  
    getCurrentUser(){
      this.userService.getWhereUser(this.currentUserName).subscribe(response => {
        this.currentUser = response.data;
        console.log(this.currentUser);
      })
    }
  
    getReviews(){
      this.reviewService.getWhereProductIdReview(this.currentProductId).subscribe(response => {
        this.productReviews = response.data;
        console.log(this.productReviews);
      });
    }
}
