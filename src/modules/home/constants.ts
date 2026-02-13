export const CATEGORIES = [
  {
    id: "combos",
    i18nKey: "categories.combos",
    items: [
      {
        id: "combo_1",
        nameKey: "products.combo_1.name",
        descriptionKey: "products.combo_1.description",
        contents: [
          { name: "deditos", quantity: 25, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 25,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 24000, fried: 29000 },
      },
      {
        id: "combo_2",
        nameKey: "products.combo_2.name",
        descriptionKey: "products.combo_2.description",
        contents: [
          { name: "deditos", quantity: 20, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 15,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
          { name: "ojosDeBuey", quantity: 15, flavors: null },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 24000, fried: 29000 },
      },
      {
        id: "combo_5",
        nameKey: "products.combo_5.name",
        contents: [
          { name: "deditos", quantity: 35, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 35,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 34000, fried: 41000 },
      },
      {
        id: "combo_6",
        nameKey: "products.combo_6.name",
        contents: [
          { name: "deditos", quantity: 30, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 20,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
          { name: "ojosDeBuey", quantity: 20, flavors: null },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 34000, fried: 41000 },
      },
      {
        id: "combo_9",
        nameKey: "products.combo_9.name",
        contents: [
          { name: "deditos", quantity: 50, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 50,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 48000, fried: 56000 },
      },
      {
        id: "combo_10",
        nameKey: "products.combo_10.name",
        contents: [
          { name: "deditos", quantity: 40, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 30,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
          { name: "ojosDeBuey", quantity: 30, flavors: null },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 48000, fried: 56000 },
      },
      {
        id: "combo_13",
        nameKey: "products.combo_13.name",
        contents: [
          { name: "deditos", quantity: 75, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 75,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 72000, fried: 87000 },
      },
      {
        id: "combo_14",
        nameKey: "products.combo_14.name",
        contents: [
          { name: "deditos", quantity: 50, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 50,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
          { name: "ojosDeBuey", quantity: 50, flavors: null },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 72000, fried: 87000 },
      },
      {
        id: "combo_15",
        nameKey: "products.combo_15.name",
        contents: [
          { name: "deditos", quantity: 100, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 100,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 95000, fried: 112000 },
      },
      {
        id: "combo_16",
        nameKey: "products.combo_16.name",
        contents: [
          { name: "deditos", quantity: 80, flavors: ["Queso", "Bocadillo"] },
          {
            name: "empanadas",
            quantity: 60,
            flavors: ["Pollo", "Hawaiana", "Jamón y queso"],
          },
          { name: "ojosDeBuey", quantity: 60, flavors: null },
        ],
        comboFlavors: {
          deditos: ["Queso", "Bocadillo"],
          empanadas: ["Pollo", "Hawaiana", "Jamón y queso"],
        },
        prices: { refrigerated: 95000, fried: 112000 },
      },
    ],
  },

  /* ========================= */
  /* PRODUCTOS INDIVIDUALES */
  /* ========================= */

  {
    id: "deditos",
    i18nKey: "categories.deditos",
    items: [
      {
        id: "deditos_cheese",
        nameKey: "products.deditos_cheese.name",
        descriptionKey: "products.deditos.description",
        contents: [{ name: "cheese", quantity: 12 }],
        unit: 12,
        prices: { refrigerated: 9000, fried: 12000 },
      },
      {
        id: "deditos_guava",
        nameKey: "products.deditos_guava.name",
        descriptionKey: "products.deditos.description",
        contents: [{ name: "guava", quantity: 12 }],
        unit: 12,
        prices: { refrigerated: 9000, fried: 12000 },
      },
      {
        id: "deditos_mixed",
        nameKey: "products.deditos_mixed.name",
        descriptionKey: "products.deditos.description",
        contents: [{ name: "mixed", quantity: 12 }],
        unit: 12,
        prices: { refrigerated: 10000, fried: 13000 },
      },
    ],
  },

  {
    id: "empanadas",
    i18nKey: "categories.empanadas",
    items: [
      {
        id: "empanadas_chicken",
        nameKey: "products.empanadas_chicken.name",
        descriptionKey: "products.empanadas.description",
        contents: [{ name: "chicken", quantity: 8 }],
        unit: 8,
        prices: { refrigerated: 9000, fried: 12000 },
      },
      {
        id: "empanadas_hawaiian",
        nameKey: "products.empanadas_hawaiian.name",
        descriptionKey: "products.empanadas.description",
        contents: [{ name: "hawaiian", quantity: 8 }],
        unit: 8,
        prices: { refrigerated: 9000, fried: 12000 },
      },
      {
        id: "empanadas_ham_cheese",
        nameKey: "products.empanadas_ham_cheese.name",
        descriptionKey: "products.empanadas.description",
        contents: [{ name: "ham_cheese", quantity: 8 }],
        unit: 8,
        prices: { refrigerated: 9000, fried: 12000 },
      },
    ],
  },

  {
    id: "panzerottis",
    i18nKey: "categories.panzerottis",
    items: [
      {
        id: "panzerotti_chicken",
        nameKey: "products.panzerotti_chicken.name",
        descriptionKey: "products.panzerotti.description",
        contents: [{ name: "chicken", quantity: 10 }],
        sizes: { medium: 10, large: 6 },
        prices: { refrigerated: 14000, fried: 17000 },
      },
      {
        id: "panzerotti_ranch",
        nameKey: "products.panzerotti_ranch.name",
        descriptionKey: "products.panzerotti.description",
        contents: [{ name: "ranch", quantity: 10 }],
        sizes: { medium: 10, large: 6 },
        prices: { refrigerated: 14000, fried: 17000 },
      },
      {
        id: "panzerotti_hawaiian",
        nameKey: "products.panzerotti_hawaiian.name",
        descriptionKey: "products.panzerotti.description",
        contents: [{ name: "hawaiian", quantity: 10 }],
        sizes: { medium: 10, large: 6 },
        prices: { refrigerated: 14000, fried: 17000 },
      },
      {
        id: "panzerotti_ham_cheese",
        nameKey: "products.panzerotti_ham_cheese.name",
        descriptionKey: "products.panzerotti.description",
        contents: [{ name: "ham_cheese", quantity: 10 }],
        sizes: { medium: 10, large: 6 },
        prices: { refrigerated: 14000, fried: 17000 },
      },
      {
        id: "panzerotti_mixed",
        nameKey: "products.panzerotti_mixed.name",
        descriptionKey: "products.panzerotti.description",
        contents: [{ name: "mixed", quantity: 10 }],
        sizes: { medium: 10, large: 6 },
        prices: { refrigerated: 15000, fried: 18000 },
      },
    ],
  },
];
