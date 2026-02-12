function required(key: string, value?: string) {
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
}

export const enviroments = {
  apiBaseUrl: required(
    "NEXT_PUBLIC_API_BASE_URL",
    process.env.NEXT_PUBLIC_API_BASE_URL,
  ),
};
