import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/components/admin-product/admin-product.component';
import { AdminProductAddComponent } from './admin/components/admin-product-add/admin-product-add.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { CustomerProductComponent } from './customer/customer-product/customer-product.component';
import { CustomerCreditCardComponent } from './customer/customer-credit-card/customer-credit-card.component';
import { CustomerCartComponent } from './customer/customer-cart/customer-cart.component';
import { CustomerProductDetailComponent } from './customer/customer-product-detail/customer-product-detail.component';
import { CustomerCategoryComponent } from './customer/customer-category/customer-category.component';
import { AdminProductDetailComponentComponent } from './admin/components/admin-product-detail-component/admin-product-detail-component.component';
import { AdminUserComponentComponent } from './admin/components/admin-user-component/admin-user-component.component';
import { CustomerMyordersComponent } from './customer/customer-myorders/customer-myorders.component';

export const routes: Routes = [
    {path:"admin",component:AdminComponent,children:[
        {path:"products",component:AdminProductComponent},
        {path:"product-add",component:AdminProductAddComponent},
        {path:"product-detail/:productId",component:AdminProductDetailComponentComponent},
        {path:"users",component:AdminUserComponentComponent}
    ]},
    {path:"",component:CustomerComponent,children:[
        {path:"",component:CustomerCategoryComponent},
        {path:"login",component:CustomerLoginComponent},
        {path:"profile",component:CustomerProfileComponent},
        {path:"home",component:CustomerProductComponent},
        {path:"credit-cards",component:CustomerCreditCardComponent},
        {path:"cart",component:CustomerCartComponent},
        {path:"product-detail/:productId",component:CustomerProductDetailComponent},
        {path:"category/:categoryId",component:CustomerProductComponent},
        {path:"my-orders",component:CustomerMyordersComponent}
    ]},
];
