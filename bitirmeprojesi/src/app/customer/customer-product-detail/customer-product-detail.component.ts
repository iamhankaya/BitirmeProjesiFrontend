import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup,FormBuilder,Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Review } from '../../models/review';
import { UserServiceService } from '../../services/user-service.service';
import { ReviewServiceService } from '../../services/review-service.service';
import { ToastService } from '../../services/toast-service.service';

@Component({
  selector: 'app-customer-product-detail',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,ReactiveFormsModule],
  templateUrl: './customer-product-detail.component.html',
  styleUrl: './customer-product-detail.component.css'
})
export class CustomerProductDetailComponent implements OnInit{
  
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
    this.createReviewForm();
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

  createReviewForm(){
    this.reviewForm = this.formBuilder.group({
      rating:["",Validators.required],
      comment:["",Validators.required]
    })
  }
  publishReview(){
    if(this.reviewForm.valid){
      let reviewModel:Review = Object.assign({},this.reviewForm.value);
      reviewModel.productId = this.currentProductId;
      reviewModel.userId = this.currentUser[0].id;
      console.log(reviewModel);
      this.reviewService.addReview(reviewModel).subscribe(response => {
        this.showToast(response.message);
      });
    }
  }

  getReviews(){
    this.reviewService.getWhereReview(this.currentProductId).subscribe(response => {
      this.productReviews = response.data;
      console.log(this.productReviews);
    });
  }
}
