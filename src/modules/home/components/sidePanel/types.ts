import type { Transaction } from "@/services/transactions/transactions.types";

export interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}
