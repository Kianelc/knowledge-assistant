import { Customer } from './customer';

describe('Customer', () => {
  it('should create a customer', () => {
    const customer = new Customer({
      id: 'customer-1',
      name: 'Customer A',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(customer.getId()).toBe('customer-1');
    expect(customer.getName()).toBe('Customer A');
  });
});
