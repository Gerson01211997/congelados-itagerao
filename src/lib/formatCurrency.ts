export function formatCOP(value: number): string {
  const formatted = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  const [millions, thousands] = formatted.split(".", 2);

  if (!thousands) return formatted;

  return `${millions}'${formatted.slice(millions.length + 1)}`;
}
