"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/services/transactions/transactions.service";
import type {
  Transaction,
  UseTransactionsOptions,
} from "@/services/transactions/transactions.types";

export function useTransactions(options?: UseTransactionsOptions) {
  const { onSuccess, onError } = options ?? {};

  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    getTransactions()
      .then((result) => {
        if (!isMounted) return;

        setData(result);
        onSuccess?.(result);
      })
      .catch((err) => {
        if (!isMounted) return;

        setError(err);
        onError?.(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [onSuccess, onError]);

  return { data, loading, error };
}
