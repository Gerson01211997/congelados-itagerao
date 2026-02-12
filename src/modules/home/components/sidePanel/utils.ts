import type { SalesType } from "@/services/transactions/transactions.enum";

export function generateTypePay({ salesType }: { salesType: SalesType }) {
  return `listTransactions.listRow.header.rows.typePay.${salesType}`;
}
