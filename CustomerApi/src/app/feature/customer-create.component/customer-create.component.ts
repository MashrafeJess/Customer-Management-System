import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../../service/customer';
import { Customer } from '../../model/customer.model';
import { Result } from '../../model/result.model';

@Component({
  selector: 'app-customer-create',
  standalone: true, // <-- marks it as standalone
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {
  customerForm: FormGroup;
  submitting = false;
  message = '';

  constructor(private fb: FormBuilder, private userService: CustomerService) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: [''],
      dateofBirth: ['']
    });
  }

  submit(): void {
    if (this.customerForm.invalid) {
      this.message = 'Please fill all required fields correctly.';
      return;
    }

    this.submitting = true;
    const customer: Customer = this.customerForm.value;

    this.userService.createCustomer(customer).subscribe({
      next: (res: Result<Customer>) => {
        this.submitting = false;
        if (res.success) {
          this.message = 'Customer created successfully!';
          this.customerForm.reset();
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
