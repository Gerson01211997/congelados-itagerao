import type {
  TransactionStatus,
  PaymentMethod,
  SalesType,
  CardFranchise,
} from "@/services/transactions/transactions.enum";

export interface Transaction {
  id: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  salesType: SalesType;
  createdAt: string;
  transactionReference: number;
  amount: number;
  deduction?: number;
  franchise?: CardFranchise;
}

export type TransactionsResponse = {
  data: Transaction[];
};

export type UseTransactionsOptions = {
  onSuccess?: (data: TransactionsResponse["data"]) => void;
  onError?: (error: Error) => void;
};
