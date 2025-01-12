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
import { ProductImageServiceService } from '../../services/product-image-service.service';
import { ProductImage } from '../../models/productImage';

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
  productImages:ProductImage[] = [];
  imageApi: string = "https://localhost:7209/images/"
  currentUserName = localStorage.getItem("customerName") || "";
  currentProductId:Number;
  reviewForm:FormGroup;
  review:Review;
  productReviews:Review[] = [];
  productReviewPoint:number;
  constructor(private productService:ProductServiceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private userService:UserServiceService,
    private reviewService:ReviewServiceService,
    private toastService:ToastService,
    private producImageService:ProductImageServiceService
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

  getAllImages() {
    this.producImageService.getAllImages().subscribe(response => {
      this.productImages = response.data;
      console.log(this.productImages);
    })
  }
  getImagePath(product: Product) {
    console.log('Product:', product);
    const productImage = this.productImages?.find(p => product.id === p.productId);
    console.log('Product Image:', productImage);

    if (productImage && productImage.imagePath) {
        return this.imageApi + productImage.imagePath;
    }

    return 'path/to/default/image.png';
}

  setCurrentProduct() {
    this.getProductId();
    this.getReviews();
    this.productService.getSingleProduct(this.currentProductId).subscribe(response => {
      this.currentProduct = Array.isArray(response.data) ? response.data : [response.data];
      console.log(this.currentProduct);
      this.getAllImages();
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

  createReviewForm(){
    this.reviewForm = this.formBuilder.group({
      rating:["",Validators.required],
      comment:["",Validators.required]
    })
  }
  publishReview(){
    if(this.reviewForm.valid){
      let reviewModel:Review = Object.assign({},this.reviewForm.value);
      this.currentProduct[0].reviewPoint = this.calculateProductReviewPoint(reviewModel.rating);
      console.log(this.currentProduct[0].reviewPoint);
      this.productService.updateProduct(this.currentProduct[0]).subscribe(response =>{
        this.showToast(response.message);
        console.log("Product Update=" + response.message);
      });
      reviewModel.productId = this.currentProductId;
      reviewModel.userId = this.currentUser[0].id;
      console.log(reviewModel);
      this.reviewService.addReview(reviewModel).subscribe(response => {
        this.showToast(response.message);
        this.getReviews();
      });
    }
  }

  getReviews(){
    this.reviewService.getWhereProductIdReview(this.currentProductId).subscribe(response => {
      this.productReviews = response.data;
      console.log(this.productReviews);
    });
  }
  calculateProductReviewPoint(reviewPoint:number){
     this.productReviewPoint = ((this.currentProduct[0].reviewPoint * this.productReviews.length) + reviewPoint) / (this.productReviews.length +1);
     return this.productReviewPoint;
  }
}
