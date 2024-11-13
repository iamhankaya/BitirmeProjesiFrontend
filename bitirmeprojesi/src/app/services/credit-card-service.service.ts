import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/data-response-model';
import { CreditCard } from '../models/credit-card';
import { ResponseModelBase } from '../models/response-model-base';

@Injectable({
  providedIn: 'root'
})
export class CreditCardServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "https://localhost:7209/api/CreditCards/";

  getAllCreditCard():Observable<DataResponseModel<CreditCard>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<DataResponseModel<CreditCard>>(newPath);
  }

  addCreditCard(product:CreditCard):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  addRangeCreditCard(products:CreditCard[]):Observable<ResponseModelBase>{
     let newPath = this.apiUrl+"addrangeasync"
    return this.httpClient.post<ResponseModelBase>(newPath,products)
  }

  updateCreditCard(product:CreditCard):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"update";
    return this.httpClient.post<ResponseModelBase>(newPath,product);
  }

  getWhereCreditCard():Observable<DataResponseModel<CreditCard>>{
    let newPath = this.apiUrl+"getwhere";
    return this.httpClient.get<DataResponseModel<CreditCard>>(newPath);
  }

  getSingleCreditCard():Observable<DataResponseModel<CreditCard>>{
    let newPath = this.apiUrl+"getsingleasync";
    return this.httpClient.get<DataResponseModel<CreditCard>>(newPath);
  }

  deleteCreditCard(product:CreditCard):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: product
  });
  }

  deleteByIdCreditCard(product:CreditCard):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"delete?id="+product.id;
    return this.httpClient.delete<ResponseModelBase>(newPath);
  }

  deleteRangeCreditCard(products:CreditCard[]):Observable<ResponseModelBase>{
    let newPath = this.apiUrl+"deleterange";
    return this.httpClient.request<ResponseModelBase>('DELETE', newPath, {
      body: products
  });
  }
}
