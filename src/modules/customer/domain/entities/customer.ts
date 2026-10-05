export type CustomerProps = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Customer {
  private readonly id: string;
  private name: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: CustomerProps) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
