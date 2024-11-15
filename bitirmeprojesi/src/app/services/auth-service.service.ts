import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { UserForRegister } from '../models/user-for-register';
import { ResponseModelBase } from '../models/response-model-base';
import { TokenResponseModel } from '../models/token-response-model';
import { UserForLogin } from '../models/user-for-login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiUrl = "https://localhost:7209/api/Auths/"
  private isLoginSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLogin$ = this.isLoginSubject.asObservable();
  private customerNameSubject = new BehaviorSubject<string | null>(localStorage.getItem("customerName"));
  customerNameSubject$ = this.customerNameSubject.asObservable();

  constructor(private httpClient:HttpClient) { }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  register(userForRegister:UserForRegister):Observable<TokenResponseModel>{
    let newPath = this.apiUrl+"register";
    this.isLoginSubject.next(true);
    localStorage.setItem("customerName",userForRegister.firstName+" "+userForRegister.lastName);
    return this.httpClient.post<TokenResponseModel>(newPath,userForRegister);
  }

  login(userForLogin:UserForLogin):Observable<TokenResponseModel>{
    let newPath = this.apiUrl+"login";
    this.isLoginSubject.next(true);
    return this.httpClient.post<TokenResponseModel>(newPath,userForLogin);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("customerName");
    this.isLoginSubject.next(false);
  }
}
