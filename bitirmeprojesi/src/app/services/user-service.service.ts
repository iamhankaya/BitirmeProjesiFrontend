import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/data-response-model';
import { User } from '../models/user';
import { ResponseModelBase } from '../models/response-model-base';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "https://localhost:7209/api/Users/";

  getAllUser():Observable<DataResponseModel<User>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<DataResponseModel<User>>(newPath);
  }

  addUser(product:User):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  addRangeUser(products:User[]):Observable<ResponseModelBase>{
     let newPath = this.apiUrl+"addrangeasync"
    return this.httpClient.post<ResponseModelBase>(newPath,products)
  }

  updateUser(product:User):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"update";
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  getWhereUser():Observable<DataResponseModel<User>>{
    let newPath = this.apiUrl+"getwhere";
    return this.httpClient.get<DataResponseModel<User>>(newPath);
  }

  getSingleUser():Observable<DataResponseModel<User>>{
    let newPath = this.apiUrl+"getsingleasync";
    return this.httpClient.get<DataResponseModel<User>>(newPath);
  }

  deleteUser(product:User):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: product
  });
  }

  deleteByIdUser(product:User):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete?id="+product.id;
    return this.httpClient.delete<ResponseModelBase>(newPath);
  }

  deleteRangeUser(products:User[]):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"deleterange";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: products
  });
  }
}
