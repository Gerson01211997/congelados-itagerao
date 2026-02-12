import { formatDateTime } from "@/lib/formatDateTime";

export function generateDateVariants(dateString: string): string[] {
  const date = new Date(dateString);
  const pad = (v: number) => `${v}`.padStart(2, "0");
  const yyyyMMdd = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const ddMMyyyy = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  const isoDate = date.toISOString().split("T")[0];
  const formattedDate = formatDateTime(dateString);
  return [yyyyMMdd, ddMMyyyy, isoDate, formattedDate];
}
