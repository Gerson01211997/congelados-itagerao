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
  const lines: string[] = [];

  lines.push(t("whatsapp.greeting"));
  lines.push("");

  cartItems.forEach((item) => {
    lines.push(`🛒 ${item.name}`);
    lines.push(
      t("whatsapp.itemQuantityLine", {
        quantity: item.quantity,
      }),
    );
    lines.push(
      t("whatsapp.itemTypeLine", {
        type: t(`variants.${item.priceType}`),
      }),
    );

    if (item.selectedFlavors && Object.keys(item.selectedFlavors).length > 0) {
      lines.push(t("whatsapp.flavorsTitle"));
      Object.entries(item.selectedFlavors).forEach(([group, flavors]) => {
        lines.push(`- ${t(`products.flavors.${group}`)}:`);
        Object.entries(flavors).forEach(([flavor, qty]) => {
          lines.push(`   • ${qty} ${flavor}`);
        });
      });
    }

    if (item.comment) {
      lines.push(t("whatsapp.commentTitle"));
      lines.push(`"${item.comment}"`);
    }

    lines.push("");
  });

  lines.push(
    `${t("whatsapp.total")}: $${total.toLocaleString("es-CO")} COP`,
  );
  lines.push("");
  lines.push(t("whatsapp.thanks"));

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  const phone = "57300417XXXX";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
