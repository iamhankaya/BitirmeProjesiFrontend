import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/components/admin-product/admin-product.component';
import { AdminProductAddComponent } from './admin/components/admin-product-add/admin-product-add.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { CustomerProductComponent } from './customer/customer-product/customer-product.component';
import { CustomerCreditCardComponent } from './customer/customer-credit-card/customer-credit-card.component';

export const routes: Routes = [
    {path:"admin",component:AdminComponent,children:[
        {path:"products",component:AdminProductComponent},
        {path:"product-add",component:AdminProductAddComponent}
    ]},
    {path:"",component:CustomerComponent,children:[
        {path:"login",component:CustomerLoginComponent},
        {path:"profile",component:CustomerProfileComponent},
        {path:"home",component:CustomerProductComponent},
        {path:"credit-cards",component:CustomerCreditCardComponent}
    ]},
];
