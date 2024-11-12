import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/data-response-model';
import { Review } from '../models/review';
import { ResponseModelBase } from '../models/response-model-base';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "https://localhost:7209/api/Reviews/";

  getAllReview():Observable<DataResponseModel<Review>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<DataResponseModel<Review>>(newPath);
  }

  addReview(product:Review):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  addRangeReview(products:Review[]):Observable<ResponseModelBase>{
     let newPath = this.apiUrl+"addrangeasync"
    return this.httpClient.post<ResponseModelBase>(newPath,products)
  }

  updateReview(product:Review):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"update";
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  getWhereReview():Observable<DataResponseModel<Review>>{
    let newPath = this.apiUrl+"getwhere";
    return this.httpClient.get<DataResponseModel<Review>>(newPath);
  }

  getSingleReview():Observable<DataResponseModel<Review>>{
    let newPath = this.apiUrl+"getsingleasync";
    return this.httpClient.get<DataResponseModel<Review>>(newPath);
  }

  deleteReview(product:Review):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: product
  });
  }

  deleteByIdReview(product:Review):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete?id="+product.id;
    return this.httpClient.delete<ResponseModelBase>(newPath);
  }

  deleteRangeReview(products:Review[]):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"deleterange";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: products
  });
  }
}
