import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/user-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-customer-login',
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule],
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements AfterViewInit,OnInit {
  @ViewChild('container', { static: false }) container!: ElementRef;
  loginForm:FormGroup;
  registerForm:FormGroup;
  customers:User[] = [];
  currentCustomer:User;
  carts:Cart[] = [];
  cart!:Cart;
  constructor(private authService:AuthServiceService,
    private formBuilder:FormBuilder,
    private router: Router,
    private userService:UserServiceService,
    private cartService:CartServiceService
  ){

  }
  ngOnInit(): void {
      this.createLoginForm();
      this.createRegisterForm();
      this.getCustomers();
  }

  ngAfterViewInit() {
    // ViewChild öğesi burada erişilebilir
    if (this.container) {
      // İlk kez erişim sağlandı
    }
  }
  panelActive() {
    console.log(this.container);
    if (this.container) {
      this.container.nativeElement.classList.add("right-panel-active");
    }
  }
  panelDeactive() {
    if (this.container) {
      this.container.nativeElement.classList.remove("right-panel-active");
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response => {
        localStorage.setItem("customerName",this.registerForm.get('firstName')?.value+" "+this.registerForm.get('lastName')?.value);
        this.setCurrentCustomer();
        this.getCarts();
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        this.router.navigate(["home"]);  
      })
    }
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.setCurrentCustomer();
        this.getCarts();
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        this.router.navigate(["home"]);  
      })
    }
  }

  setCurrentCustomer() {
    console.log(this.customers);
    let email = this.loginForm.get("email")?.value;
    this.customers.forEach(customer => {
      if (customer.email == email) {
        this.currentCustomer = customer;
      }
    });
    if(this.currentCustomer==null){

    }
    localStorage.setItem("customerName",this.currentCustomer.name+" "+this.currentCustomer.surname);
  }

  getCustomers(){
    this.userService.getAllUser().subscribe(response => {
      this.customers = response.data;
    })
  }
  getCarts(){
    this.cartService.getWhereCart(this.currentCustomer.id).subscribe(response => {
      this.carts=response.data;
      console.log(this.carts);
      this.createCart();
    })
  }

  createCart(){
    if(this.carts.length === 0){
      console.log(this.currentCustomer.id);
      this.cart = { userId: this.currentCustomer.id } as Cart;
      this.cartService.addCart(this.cart).subscribe(response => {
        console.log("Kart oluşturuldu");
      })
    }
    else{
      console.log("Zaten bu kullanıcı için cart var");
    }
  }

}
