import { getAllTransactionsMock } from "@/services/transactions/hooks/getTransaction.msw";

export const transactionsHandlers = [getAllTransactionsMock()];
