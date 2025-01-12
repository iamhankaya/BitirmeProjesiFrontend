import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/data-response-model';
import { Product } from '../models/product';
import { ResponseModelBase } from '../models/response-model-base';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "https://localhost:7209/api/Products/";

  getAllProducts():Observable<DataResponseModel<Product>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<DataResponseModel<Product>>(newPath);
  }

  addProduct(product:Product):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  addRangeProduct(products:Product[]):Observable<ResponseModelBase>{
     let newPath = this.apiUrl+"addrangeasync"
    return this.httpClient.post<ResponseModelBase>(newPath,products)
  }

  updateProduct(product:Product):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"update";
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  getWhereProduct(categoryId:Number):Observable<DataResponseModel<Product>>{
    let newPath = this.apiUrl+"getwhere?categoryId="+categoryId;
    return this.httpClient.get<DataResponseModel<Product>>(newPath);
  }

  getSingleProduct(productId:Number):Observable<DataResponseModel<Product>>{
    let newPath = this.apiUrl+"getsingleasync?id="+productId;
    return this.httpClient.get<DataResponseModel<Product>>(newPath);
  }

  deleteProduct(product:Product):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: product
  });
  }

  deleteByIdProduct(product:Product):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete?id="+product.id;
    return this.httpClient.delete<ResponseModelBase>(newPath);
  }

  deleteRangeProduct(products:Product[]):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"deleterange";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: products
  });
  }
}
