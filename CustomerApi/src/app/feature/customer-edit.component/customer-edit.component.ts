// File: src/app/feature/customer-edit.component/customer-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer';
import { Customer } from '../../model/customer.model';
import { Result } from '../../model/result.model';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  submitting = false;
  message = '';
  customerId = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    public router: Router
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
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.message = 'Invalid customer ID';
      return;
    }
    this.customerId = idParam;
    this.loadCustomer(this.customerId);
  }

  loadCustomer(id: string) {
    console.log('Loading customer ID:', id);
    this.customerService.getCustomerById(id).subscribe({
      next: (res: Result<Customer>) => {
        console.log('GetCustomerById response:', res);
        if (res.success && res.data) {
          const c = res.data;
          this.customerForm.patchValue({
            name: c.name,
            email: c.email,
            address: c.address,
            dateofBirth: c.dateofBirth
          });
        } else {
          this.message = res.message || 'Failed to load customer data';
        }
      },
      error: (err) => {
        console.error('Error loading customer:', err);
        this.message = 'Server error: ' + (err?.error?.message || err.message || 'Unknown error');
      }
    });
  }

  submit(): void {
    if (this.customerForm.invalid) {
      this.message = 'Please fill valid fields';
      return;
    }

    this.submitting = true;
    this.message = 'Updating...';

    const formValue = this.customerForm.value;
    const updatedCustomer: Customer = { customerId: this.customerId };

    // Only send changed fields
    if (formValue.name) updatedCustomer.name = formValue.name;
    if (formValue.email) updatedCustomer.email = formValue.email;
    if (formValue.password) updatedCustomer.password = formValue.password;
    if (formValue.address) updatedCustomer.address = formValue.address;
    if (formValue.dateofBirth) updatedCustomer.dateofBirth = formValue.dateofBirth;

    console.log('Submitting update payload:', updatedCustomer);

    this.customerService.updateCustomer(this.customerId, updatedCustomer).subscribe({
      next: (res: Result<Customer>) => {
        console.log('Update response:', res);
        this.submitting = false;
        if (res.success) {
          this.message = 'Customer updated successfully!';
          setTimeout(() => this.router.navigate(['/customers/list']), 800);
        } else {
          this.message = 'Error: ' + res.message;
        }
      },
      error: (err) => {
        console.error('Update error:', err);
        this.submitting = false;
        this.message = 'Server error: ' + (err?.error?.message || err.message || 'Unknown error');
      }
    });
  }
}
