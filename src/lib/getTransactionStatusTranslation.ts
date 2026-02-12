import type { Locale } from "@/lib/translations";
import { getTranslation } from "@/lib/translations";
import type { TransactionStatus } from "@/services/transactions/transactions.enum";

export function getTransactionStatusTranslation(
  status: TransactionStatus,
  locale: Locale,
): string {
  const statusKey = `listTransactions.listRow.header.rows.transactionStatus.${status}`;
  return getTranslation(statusKey, locale);
}
