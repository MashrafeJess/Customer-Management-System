import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';

import { CustomerService } from '../service/customer';
import { Customer } from '../model/customer.model';
import { Result } from '../model/result.model';

@Component({
  selector: 'app-customer-print',
  standalone: true,
  templateUrl: './print-list.component.html',
  styleUrls: ['./print-list.component.css'],
  imports: [NgFor, NgIf, DatePipe]
})
export class CustomerPrintComponent implements OnInit {
  customers: Customer[] = [];
  loading = true;
  error = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load customers';
        this.loading = false;
      }
    });
  }

  printPage() {
    window.print();
  }
}
