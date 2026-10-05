import { Customer } from '../entities/customer';

export interface CustomerRepository {
  create: (customer: Customer) => Promise<void>;
}
