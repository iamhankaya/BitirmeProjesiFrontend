import { Component, OnInit } from '@angular/core';
import { CreditCardServiceService } from '../../services/credit-card-service.service';
import { CreditCard } from '../../models/credit-card';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast-service.service';

@Component({
  selector: 'app-customer-credit-card',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule,FormsModule,NgIf],
  templateUrl: './customer-credit-card.component.html',
  styleUrl: './customer-credit-card.component.css'
})
export class CustomerCreditCardComponent implements OnInit{
  creditCards:CreditCard[] = [];
  currentUser:User[]=[];
  currentName:string = localStorage.getItem("customerName") || "";
  creditCardAddForm:FormGroup
  isFormVisible = false;
  constructor(private creditCardService:CreditCardServiceService,
    private userService:UserServiceService,
    private formBuilder:FormBuilder,
    private toastService:ToastService
  ){

  }
  ngOnInit(): void {
      this.getCurrentUser();
      this.createCreditCardAddForm()
  }

  getCreditCards(){
    this.creditCardService.getWhereCreditCard(this.currentUser[0].id).subscribe(response => {
      this.creditCards = response.data;
      console.log(this.creditCards);
    })
  }

  getCurrentUser(){
    this.userService.getWhereUser(this.currentName).subscribe(response => {
      this.currentUser=response.data;
      this.getCreditCards();
    })
  }

  showForm(){
    this.isFormVisible = true;
  }

  createCreditCardAddForm(){
    this.creditCardAddForm = this.formBuilder.group({
      creditCardNumber:["",Validators.required],
      creditCardPassword:["",Validators.required]
    })
  }

  addCreditCard(){
    if(this.creditCardAddForm.valid){
      let creditCardModel = Object.assign({},this.creditCardAddForm.value);
      creditCardModel.userId=this.currentUser[0].id;
      console.log(this.currentUser[0].id);
      this.creditCardService.addCreditCard(creditCardModel).subscribe(response => {
        this.showToast(response.message);
      })
      this.isFormVisible=false;
    }
  }
  showToast(message:string) {
    this.toastService.showToast(message);
  }
}
