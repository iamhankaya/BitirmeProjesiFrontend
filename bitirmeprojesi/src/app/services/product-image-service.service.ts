import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/data-response-model';
import { ResponseModelBase } from '../models/response-model-base';
import { ProductImage } from '../models/productImage';

@Injectable({
  providedIn: 'root'
})
export class ProductImageServiceService {

  constructor(private httpClient: HttpClient) { }
  apiUrl: string = "https://localhost:7209/api/ProductImages/";

  getAllImages(): Observable<DataResponseModel<ProductImage>> {
    let newPath = this.apiUrl + "getAll"
    return this.httpClient.get<DataResponseModel<ProductImage>>("https://localhost:7209/api/ProductImages/getAll");
  }

  addImage(productImage: ProductImage): Observable<ResponseModelBase> {
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModelBase>(newPath, productImage);
  }

  getImageById(id:Number):Observable<DataResponseModel<ProductImage>> {
    let newApi = this.apiUrl + "getbyid?id="+id;
    return this.httpClient.get<DataResponseModel<ProductImage>>(newApi);
  }

  getWhereImage(id:Number):Observable<DataResponseModel<ProductImage>> {
    let newPath = this.apiUrl + "getwhere?id="+id;
    return this.httpClient.get<DataResponseModel<ProductImage>>(newPath);
  }


}
