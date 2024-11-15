import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/data-response-model';
import { Cart } from '../models/cart';
import { ResponseModelBase } from '../models/response-model-base';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "https://localhost:7209/api/Carts/";

  getAllCarts():Observable<DataResponseModel<Cart>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<DataResponseModel<Cart>>(newPath);
  }

  addCart(product:Cart):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  addRangeCart(products:Cart[]):Observable<ResponseModelBase>{
     let newPath = this.apiUrl+"addrangeasync"
    return this.httpClient.post<ResponseModelBase>(newPath,products)
  }

  updateCart(product:Cart):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"update";
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  addProductToCart(cartId:number,product:Product):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"addProductToCart?cartId="+cartId;
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  getWhereCart(userId:number):Observable<DataResponseModel<Cart>>{
    let newPath = this.apiUrl+"getwhere?userId="+userId;
    return this.httpClient.get<DataResponseModel<Cart>>(newPath);
  }

  getSingleCart(cartId:number):Observable<DataResponseModel<Cart>>{
    let newPath = this.apiUrl+"getsingleasync?cartId="+cartId;
    return this.httpClient.get<DataResponseModel<Cart>>(newPath);
  }

  deleteCart(product:Cart):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: product
  });
  }

  deleteByIdCart(product:Cart):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete?id="+product.id;
    return this.httpClient.delete<ResponseModelBase>(newPath);
  }

  deleteRangeCart(products:Cart[]):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"deleterange";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: products
  });
  }
}
