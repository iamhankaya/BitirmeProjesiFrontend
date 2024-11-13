import { Component, OnInit } from '@angular/core';
import { CustomerNavbarComponent } from "./customer-navbar/customer-navbar.component";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminFooterComponent } from "../admin/components/admin-footer/footer.component";
import { CustomerSidebarComponent } from "./customer-sidebar/customer-sidebar.component";
import { CustomerFooterComponent } from "./customer-footer/customer-footer.component";
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipePipe } from '../pipes/product-filter-pipe.pipe';
import { CustomerProductComponent } from "./customer-product/customer-product.component";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CustomerNavbarComponent, RouterOutlet, CustomerSidebarComponent, CustomerFooterComponent, CustomerProductComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  isRouter:boolean = false;

  constructor(private activatedRoute:ActivatedRoute){

  }
  ngOnInit() {
    // Parent route parametreleri
    
  }
}
