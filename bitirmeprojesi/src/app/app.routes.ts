import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/components/admin-product/admin-product.component';
import { AdminProductAddComponent } from './admin/components/admin-product-add/admin-product-add.component';

export const routes: Routes = [
    {path:"admin",component:AdminComponent,children:[
        {path:"products",component:AdminProductComponent},
        {path:"product-add",component:AdminProductAddComponent}
    ]}
];
