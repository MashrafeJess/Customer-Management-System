import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer';
import { Customer } from '../../model/customer.model';
import { Result } from '../../model/result.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  message = '';
  loading = false;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }
  fetchCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (res: Result<Customer[]>) => {
        this.loading = false;
        if (res.success && res.data) {
          this.customers = res.data;
        } else {
          this.message = res.message || 'Failed to load customers.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.message = 'Server error: ' + (err?.error?.message || err.message || 'Unknown error');
      }
    });
  }

editCustomer(id: string) {
  if (!id) return; // guard
  this.router.navigate(['/customers/edit', id]);
}


  deleteCustomer(customerId: string | number): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.customerService.deleteCustomer(customerId.toString()).subscribe({
      next: (res: Result<null>) => {
        if (res.success) {
          this.message = 'Customer deleted successfully!';
          this.fetchCustomers();
        } else {
          this.message = 'Error: ' + res.message;
        }
      },
      error: (err) => {
        this.message = 'Server error: ' + (err?.error?.message || err.message || 'Unknown error');
      }
    });
  }
}
