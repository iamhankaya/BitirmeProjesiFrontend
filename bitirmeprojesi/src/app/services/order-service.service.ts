import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/data-response-model';
import { Order } from '../models/order';
import { ResponseModelBase } from '../models/response-model-base';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "https://localhost:7209/api/Orders/";

  getAllOrders():Observable<DataResponseModel<Order>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<DataResponseModel<Order>>(newPath);
  }

  addOrder(product:Order):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  addRangeOrder(products:Order[]):Observable<ResponseModelBase>{
     let newPath = this.apiUrl+"addrangeasync"
    return this.httpClient.post<ResponseModelBase>(newPath,products)
  }

  updateOrder(product:Order):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"update";
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  getWhereOrder(userId:number):Observable<DataResponseModel<Order>>{
    let newPath = this.apiUrl+"getwhere?userId="+userId;
    return this.httpClient.get<DataResponseModel<Order>>(newPath);
  }

  getSingleOrder():Observable<DataResponseModel<Order>>{
    let newPath = this.apiUrl+"getsingleasync";
    return this.httpClient.get<DataResponseModel<Order>>(newPath);
  }

  deleteOrder(product:Order):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: product
  });
  }

  deleteByIdOrder(product:Order):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete?id="+product.id;
    return this.httpClient.delete<ResponseModelBase>(newPath);
  }

  deleteRangeOrder(products:Order[]):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"deleterange";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: products
  });
  }
}
