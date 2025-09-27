import { Routes } from '@angular/router';

import { CustomerCreateComponent } from './feature/customer-create.component/customer-create.component';
import { CustomerDetailsComponent } from './feature/customer-details.component/customer-details.component';
import { CustomerEditComponent } from './feature/customer-edit.component/customer-edit.component';
import { CustomerListComponent } from './feature/customer-list.component/customer-list.component';
import { HomepageComponent } from './homepage.component/homepage.component';

export const routes: Routes = [
  { path: 'customers/list', component: CustomerListComponent },
  { path: 'customers/create', component: CustomerCreateComponent },
  { path: 'customers/edit/:id', component: CustomerEditComponent },
  { path: 'customers/details/:id', component: CustomerDetailsComponent },
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: '**', component: HomepageComponent }
];
