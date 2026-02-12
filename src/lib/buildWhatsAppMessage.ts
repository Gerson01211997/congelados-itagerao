import type { CartItem } from "@/store/cart.store";

type Translator = (
  key: string,
  params?: Record<string, string | number>,
) => string;

export function buildWhatsAppMessage(
  cartItems: CartItem[],
  total: number,
  t: Translator,
): string {
  const greeting = t("whatsapp.greeting");
  const orderTitle = t("whatsapp.orderTitle");
  const totalLabel = t("whatsapp.total");
  const availability = t("whatsapp.availability");

  const lines: string[] = [];

  lines.push(greeting);
  lines.push("");
  lines.push(`🛒 ${orderTitle}`);

  cartItems.forEach((item) => {
    const line = t("whatsapp.itemLine", {
      quantity: item.quantity,
      name: item.name,
      variant: item.variantLabel,
      total: (item.unitPrice * item.quantity).toLocaleString("es-CO"),
    });
    lines.push(`• ${line}`);
  });

  lines.push("");
  lines.push(`${totalLabel}: $${total.toLocaleString("es-CO")} COP`);
  lines.push("");
  lines.push(availability);

  return lines.join("\n");
}
