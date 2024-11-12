import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductServiceService } from '../../../services/product-service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductFilterPipePipe } from '../../../pipes/product-filter-pipe.pipe';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [NgFor,FormsModule,ProductFilterPipePipe,NgIf],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit {
  products:Product[] = [];
  filterText: string = "";

 constructor(private productService:ProductServiceService){}
 ngOnInit(): void {
     this.getAllProducts();
 }

 getAllProducts(){
  this.productService.getAllProducts().subscribe(response =>{
    this.products = response.data;
  })
 }
}
