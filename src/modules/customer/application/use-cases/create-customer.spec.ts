import { Customer } from '../../domain/entities/customer';
import { CustomerRepository } from '../../domain/repositories/customer-repository';
import { CreateCustomerInput, CreateCustomerUseCase } from './create-customer';

class CustomerRepositoryMock implements CustomerRepository {
  public customers: Customer[] = [];

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }
}

describe('CreateCustomerUseCase', () => {
  it('should create a customer', async () => {
    const repository = new CustomerRepositoryMock();
    const useCase = new CreateCustomerUseCase(repository);

    const input: CreateCustomerInput = {
      name: 'Customer A',
    };

    await useCase.execute(input);

    expect(repository.customers).toHaveLength(1);
    expect(repository.customers[0].getName()).toBe('Customer A');
  });
});
