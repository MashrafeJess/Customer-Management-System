export interface Customer {
  customerId?: string;
  name?: string;
  email?: string;
  password?: string;        // optional for security; usually you don’t fetch passwords
  dateofBirth?: string;     // TypeScript doesn’t have DateOnly, so use string or Date
  address?: string;       // if you have phone in API, otherwise remove
}
