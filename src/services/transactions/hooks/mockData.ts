import { faker } from "@faker-js/faker";
import {
  PaymentMethod,
  SalesType,
  TransactionStatus,
} from "@/services/transactions/transactions.enum";

export const generateMockData = (count: number = 10) => {
  const data = [];

  for (let i = 0; i < count; i++) {
    const statusValues = Object.values(TransactionStatus);
    const paymentMethods = Object.values(PaymentMethod);
    const salesTypes = Object.values(SalesType);

    data.push({
      id: faker.string.uuid(),
      status: faker.helpers.arrayElement(statusValues),
      paymentMethod: faker.helpers.arrayElement(paymentMethods),
      salesType: faker.helpers.arrayElement(salesTypes),
      createdAt: faker.date.past().toISOString().split("T")[0],
      transactionReference: faker.number.int({
        min: 1000000000,
        max: 9999999999,
      }),
      amount: faker.number.int({ min: 1000, max: 1000000 }),
    });
  }

  return data;
};
