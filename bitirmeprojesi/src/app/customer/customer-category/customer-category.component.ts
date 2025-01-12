import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { Product } from '../../models/product';
import { CategoryServiceService } from '../../services/category-service.service';
import { Category } from '../../models/category';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-category',
  standalone: true,
  imports: [NgFor],
  templateUrl: './customer-category.component.html',
  styleUrl: './customer-category.component.css'
})
export class CustomerCategoryComponent implements OnInit {
  products:Product[] = []
  product1!:Product;
  product2!:Product;
  product3!:Product;
  imagesUrl:string[] = ["elektronik.jfif","ev esyaları.jfif","giyim.jff","naber.jfif","kişisel bakım.jfif","ofis- okul.jfif","oyuncak.jfif","sportif.jfif","takı.jfif"];
  categories:Category[] = [];
  productsPlaceHolder:Product[]=[this.product1,this.product2,this.product3];
  constructor(private productService:ProductServiceService,
    private categoryService:CategoryServiceService,
    private router:Router
  ){}
  ngOnInit(): void {
      this.getAllCategories();
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.data;
    })
  }

  goCategoryDetail(categoryId:Number){
    console.log("tık");
    this.router.navigate(['/category', categoryId]);
   }
}
