import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf, DatePipe } from '@angular/common';

import { CustomerService } from '../service/customer';
import { Customer } from '../model/customer.model';
import { Result } from '../model/result.model';

@Component({
  selector: 'app-customer-details-print',
  standalone: true,
  imports: [ NgIf, DatePipe],
  templateUrl: './customerdetails-print.component.html',
  styleUrls: ['./customerdetails-print.component.css']
})
export class CustomerDetailsPrintComponent implements OnInit {
  customerId: string | null = null;
  customer: Customer | null = null;
  loading = true;
  message = '';

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe({
        next: (res) => {
          this.customer = res.data || null;
          this.loading = false;
        },
        error: (err) => {
          this.message = 'Error loading customer details';
          this.loading = false;
        }
      });
    }
  }

  printPage() {
    window.print();
  }
}
