import { enviroments } from "@/lib/enviroments";
import { apiClient } from "@/services/apiClient";
import type { TransactionsResponse } from "@/services/transactions/transactions.types";
import { ROUTES } from "@/services/transactions/transactions.routes";

const ENDPOINT = `${enviroments.apiBaseUrl}${ROUTES.list}`;

export async function getTransactions() {
  const res = await apiClient<TransactionsResponse>(ENDPOINT, {
    method: "GET",
  });
  return res.data;
}
