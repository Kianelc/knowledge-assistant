import { randomUUID } from 'node:crypto';
import { Customer } from '../../domain/entities/customer';
import { CustomerRepository } from '../../domain/repositories/customer-repository';

export type CreateCustomerInput = {
  name: string;
};

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(input: CreateCustomerInput): Promise<void> {
    const now = new Date();

    const customer = new Customer({
      id: randomUUID(),
      name: input.name,
      createdAt: now,
      updatedAt: now,
    });

    await this.customerRepository.create(customer);
  }
}
