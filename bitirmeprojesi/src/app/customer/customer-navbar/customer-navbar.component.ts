import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-customer-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css'
})
export class CustomerNavbarComponent implements OnInit {
  isAuth:Boolean;
  currentUserName = localStorage.getItem("customerName");
  constructor(private authService:AuthServiceService){

  }
  ngOnInit(): void {
    this.authService.isLogin$.subscribe(loginStatus => {
      this.authService.customerNameSubject$.subscribe(customerName => {
        this.currentUserName = customerName;
      })
      this.isAuth = loginStatus;
      console.log(this.isAuth);
    })
}
  logout(){
    this.authService.logout();
  }
}
