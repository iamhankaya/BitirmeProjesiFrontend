import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from '../../services/category-service.service';
import { Category } from '../../models/category';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-customer-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './customer-sidebar.component.html',
  styleUrl: './customer-sidebar.component.css'
})
export class CustomerSidebarComponent implements OnInit{
  categories:Category [] = [];
  subCategories:Category[] = [];
  constructor(
    private categoryService:CategoryServiceService
  ){

  }
  ngOnInit(): void {
      this.getCategories();
  }
  getCategories(){
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.data;
      let categoryCount:number = 8
      for(let i:number = 0; i < categoryCount;i++){
        this.subCategories[i] = this.categories[i];
      }
    })
  }

}
