import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/data-response-model';
import { Category } from '../models/category';
import { ResponseModelBase } from '../models/response-model-base';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "https://localhost:7209/api/Categories/";

  getAllCategories():Observable<DataResponseModel<Category>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<DataResponseModel<Category>>(newPath);
  }

  addCategory(product:Category):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  addRangeCategory(products:Category[]):Observable<ResponseModelBase>{
     let newPath = this.apiUrl+"addrangeasync"
    return this.httpClient.post<ResponseModelBase>(newPath,products)
  }

  updateCategory(product:Category):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"update";
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  getWhereCategory():Observable<DataResponseModel<Category>>{
    let newPath = this.apiUrl+"getwhere";
    return this.httpClient.get<DataResponseModel<Category>>(newPath);
  }

  getSingleCategory():Observable<DataResponseModel<Category>>{
    let newPath = this.apiUrl+"getsingleasync";
    return this.httpClient.get<DataResponseModel<Category>>(newPath);
  }

  deleteCategory(product:Category):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: product
  });
  }

  deleteByIdCategory(product:Category):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete?id="+product.id;
    return this.httpClient.delete<ResponseModelBase>(newPath);
  }

  deleteRangeCategory(products:Category[]):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"deleterange";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: products
  });
  }

  searchCategoryWithFile(filePath:string):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"searchcategorywithfile?imagePath="+filePath;
    return this.httpClient.get<DataResponseModel<number>>(newPath);
  }
}
