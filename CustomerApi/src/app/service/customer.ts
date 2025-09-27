import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { Result } from '../model/result.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  registration(customer: Customer) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:7204/UserService';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Result<Customer[]>> {
    return this.http.get<Result<Customer[]>>(`${this.apiUrl}/GetAllUsers`);
  }

 getCustomerById(id: string): Observable<Result<Customer>> {
  return this.http.get<Result<Customer>>(`${this.apiUrl}/GetUserById`, {
    params: { userId: id } // query parameter
  });
}

  createCustomer(customer: Customer): Observable<Result<Customer>> {
    return this.http.post<Result<Customer>>(`${this.apiUrl}/Registration`, customer);
  }

updateCustomer(customerId: string, customer: Customer): Observable<Result<Customer>> {
  return this.http.put<Result<Customer>>(
    `${this.apiUrl}/UpdateCustomer`,
    customer // make sure this is a JS object, not null
  );
}


  deleteCustomer(id: string): Observable<Result<null>> {
    return this.http.delete<Result<null>>(`${this.apiUrl}/DeleteCustomer/${id}`);
  }
}
