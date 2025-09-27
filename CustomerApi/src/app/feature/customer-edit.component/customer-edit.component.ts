import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule,NgClass } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerService } from '../../service/customer';
import { Customer } from '../../model/customer.model';
import { Result } from '../../model/result.model';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgClass],
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  submitting = false;
  message = '';
  customerId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public router: Router, // <-- must be public for template
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      name: [''],
      email: ['', Validators.email],
      password: [''],
      address: [''],
      dateofBirth: ['']
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.loadCustomer(this.customerId);
    }
  }

  loadCustomer(id: string) {
    this.customerService.getCustomerById(id).subscribe({
      next: (res: Result<Customer>) => {
        if (res.success && res.data) {
          const customer = res.data;
          this.customerForm.patchValue({
            name: customer.name,
            email: customer.email,
            address: customer.address,
            dateofBirth: customer.dateofBirth
          });
        } else {
          this.message = 'Failed to load customer data.';
        }
      },
      error: (err) => {
        this.message = 'Server error: ' + (err?.error?.message || err.message || 'Unknown error');
      }
    });
  }

  submit(): void {
    if (this.customerForm.invalid) {
      this.message = 'Please fill all required fields correctly.';
      return;
    }

    this.submitting = true;
    const customer: Customer = {
      customerId: this.customerId!,
      ...this.customerForm.value
    };

    this.customerService.updateCustomer(this.customerId!, customer).subscribe({
      next: (res: Result<Customer>) => {
        this.submitting = false;
        if (res.success) {
          this.message = 'Customer updated successfully!';
          setTimeout(() => this.router.navigate(['/customers/list']), 1000);
        } else {
          this.message = 'Error: ' + res.message;
        }
      },
      error: (err) => {
        this.submitting = false;
        this.message = 'Server error: ' + (err?.error?.message || err.message || 'Unknown error');
      }
    });
  }
}
