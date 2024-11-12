import { NgFor } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductServiceService } from '../../../services/product-service.service';
import { CategoryServiceService } from '../../../services/category-service.service';
import { Category } from '../../../models/category';
import { ToastService } from '../../../services/toast-service.service';
 


@Component({
  selector: 'app-admin-product-add',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgFor],
  templateUrl: './admin-product-add.component.html',
  styleUrl: './admin-product-add.component.css'
})
export class AdminProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  categories:Category[];

  constructor(private productService:ProductServiceService,
    private formBuilder:FormBuilder,
    private categoryService:CategoryServiceService,
    private toastService:ToastService
  ){}

  ngOnInit(): void {
      this.createProductAddForm(); 
  }

  showToast(message:string) {
    this.toastService.showToast(message);
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      categoryId:["",Validators.required],
      name:["",Validators.required],
      description:["",Validators.required],
      stockQuantity:["",Validators.required],
      price:["",Validators.required]
    })
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.data;
    })
  }

  addProduct(){
    if(this.productAddForm.valid){
      let productModel = Object.assign({},this.productAddForm.value);
      this.productService.addProduct(productModel).subscribe(response => {
        this.showToast(response.message);
      },(responseError) => {
        this.showToast(responseError);
      })
    }
  }
}
