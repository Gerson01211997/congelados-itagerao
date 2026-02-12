import type { ApiClientOptions } from "@/services/apiClient/types";

export async function apiClient<T>(
  url: string,
  { params, ...options }: ApiClientOptions = {},
): Promise<T> {
  const query = params
    ? `?${new URLSearchParams(
        Object.entries(params).filter(([, v]) => v) as [string, string][],
      ).toString()}`
    : "";

  const res = await fetch(`${url}${query}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
