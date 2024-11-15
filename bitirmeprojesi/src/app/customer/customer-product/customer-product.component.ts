import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipePipe } from '../../pipes/product-filter-pipe.pipe';
@Component({
  selector: 'app-customer-product',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf,ProductFilterPipePipe],
  templateUrl: './customer-product.component.html',
  styleUrl: './customer-product.component.css'
})
export class CustomerProductComponent implements OnInit {
  product1!:Product;
  product2!:Product;
  product3!:Product;
  products:Product[] = [];
  productsPlaceHolder:Product[] = [this.product1,this.product2,this.product3];
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

