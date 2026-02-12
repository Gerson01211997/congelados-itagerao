export function calculateTotal(
  transactions: { amount?: number | null }[],
): number {
  return transactions.reduce((acc, tx) => acc + (tx.amount ?? 0), 0);
}
