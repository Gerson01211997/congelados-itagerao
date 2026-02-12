export const CATEGORIES = [
  {
    id: "combos",
    i18nKey: "categories.combos",
    items: [
      {
        id: "combo_1",
        nameKey: "products.combo_1.name",
        descriptionKey: "products.combo_1.description",
        contents: ["25 deditos", "25 empanadas"],
        prices: { refrigerated: 24000, fried: 29000 },
      },
      {
        id: "combo_2",
        nameKey: "products.combo_2.name",
        descriptionKey: "products.combo_2.description",
        contents: ["20 deditos", "15 empanadas", "15 ojos de buey"],
        prices: { refrigerated: 24000, fried: 29000 },
      },
      {
        id: "combo_3",
        nameKey: "products.combo_3.name",
        contents: ["50 deditos"],
        prices: { refrigerated: 24000, fried: 29000 },
      },
      {
        id: "combo_4",
        nameKey: "products.combo_4.name",
        contents: ["50 empanadas"],
        prices: { refrigerated: 27000, fried: 32000 },
      },
      {
        id: "combo_5",
        nameKey: "products.combo_5.name",
        contents: ["35 deditos", "35 empanadas"],
        prices: { refrigerated: 34000, fried: 41000 },
      },
      {
        id: "combo_6",
        nameKey: "products.combo_6.name",
        contents: ["30 deditos", "20 empanadas", "20 ojos de buey"],
        prices: { refrigerated: 34000, fried: 41000 },
      },
      {
        id: "combo_7",
        nameKey: "products.combo_7.name",
        contents: ["70 deditos"],
        prices: { refrigerated: 34000, fried: 41000 },
      },
      {
        id: "combo_8",
        nameKey: "products.combo_8.name",
        contents: ["70 empanadas"],
        prices: { refrigerated: 38000, fried: 45000 },
      },
      {
        id: "combo_9",
        nameKey: "products.combo_9.name",
        contents: ["50 deditos", "50 empanadas"],
        prices: { refrigerated: 48000, fried: 56000 },
      },
      {
        id: "combo_10",
        nameKey: "products.combo_10.name",
        contents: ["40 deditos", "30 empanadas", "30 ojos de buey"],
        prices: { refrigerated: 48000, fried: 56000 },
      },
      {
        id: "combo_11",
        nameKey: "products.combo_11.name",
        contents: ["100 deditos"],
        prices: { refrigerated: 48000, fried: 56000 },
      },
      {
        id: "combo_12",
        nameKey: "products.combo_12.name",
        contents: ["100 empanadas"],
        prices: { refrigerated: 53000, fried: 62000 },
      },
      {
        id: "combo_13",
        nameKey: "products.combo_13.name",
        contents: ["75 deditos", "75 empanadas"],
        prices: { refrigerated: 72000, fried: 87000 },
      },
      {
        id: "combo_14",
        nameKey: "products.combo_14.name",
        contents: ["50 deditos", "50 empanadas", "50 ojos de buey"],
        prices: { refrigerated: 72000, fried: 87000 },
      },
      {
        id: "combo_15",
        nameKey: "products.combo_15.name",
        contents: ["100 deditos", "100 empanadas"],
        prices: { refrigerated: 95000, fried: 112000 },
      },
      {
        id: "combo_16",
        nameKey: "products.combo_16.name",
        contents: ["80 deditos", "60 empanadas", "60 ojos de buey"],
        prices: { refrigerated: 95000, fried: 112000 },
      },
    ],
  },

  {
    id: "deditos",
    i18nKey: "categories.deditos",
    items: [
      {
        id: "deditos_cheese",
        nameKey: "products.deditos_cheese.name",
        descriptionKey: "products.deditos.description",
        contents: ["Queso"],
        unit: 12,
        prices: {
          refrigerated: 9000,
          fried: 12000,
        },
      },
      {
        id: "deditos_guava",
        nameKey: "products.deditos_guava.name",
        descriptionKey: "products.deditos.description",
        contents: ["Bocadillo"],
        unit: 12,
        prices: {
          refrigerated: 9000,
          fried: 12000,
        },
      },
      {
        id: "deditos_mixed",
        nameKey: "products.deditos_mixed.name",
        descriptionKey: "products.deditos.description",
        contents: ["Mixto"],
        unit: 12,
        prices: {
          refrigerated: 10000,
          fried: 13000,
        },
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
        contents: ["Pollo"],
        unit: 8,
        prices: {
          refrigerated: 9000,
          fried: 12000,
        },
      },
      {
        id: "empanadas_hawaiian",
        nameKey: "products.empanadas_hawaiian.name",
        descriptionKey: "products.empanadas.description",
        contents: ["Hawaiana"],
        unit: 8,
        prices: {
          refrigerated: 9000,
          fried: 12000,
        },
      },
      {
        id: "empanadas_ham_cheese",
        nameKey: "products.empanadas_ham_cheese.name",
        descriptionKey: "products.empanadas.description",
        contents: ["Jamón y queso"],
        unit: 8,
        prices: {
          refrigerated: 9000,
          fried: 12000,
        },
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
        contents: ["Pollo"],
        sizes: {
          medium: 10,
          large: 6,
        },
        prices: {
          refrigerated: 14000,
          fried: 17000,
        },
      },
      {
        id: "panzerotti_ranch",
        nameKey: "products.panzerotti_ranch.name",
        descriptionKey: "products.panzerotti.description",
        contents: ["Ranchero"],
        sizes: {
          medium: 10,
          large: 6,
        },
        prices: {
          refrigerated: 14000,
          fried: 17000,
        },
      },
      {
        id: "panzerotti_hawaiian",
        nameKey: "products.panzerotti_hawaiian.name",
        descriptionKey: "products.panzerotti.description",
        contents: ["Hawaiano"],
        sizes: {
          medium: 10,
          large: 6,
        },
        prices: {
          refrigerated: 14000,
          fried: 17000,
        },
      },
      {
        id: "panzerotti_ham_cheese",
        nameKey: "products.panzerotti_ham_cheese.name",
        descriptionKey: "products.panzerotti.description",
        contents: ["Jamón y queso"],
        sizes: {
          medium: 10,
          large: 6,
        },
        prices: {
          refrigerated: 14000,
          fried: 17000,
        },
      },
      {
        id: "panzerotti_mixed",
        nameKey: "products.panzerotti_mixed.name",
        descriptionKey: "products.panzerotti.description",
        contents: ["Mixto"],
        sizes: {
          medium: 10,
          large: 6,
        },
        prices: {
          refrigerated: 15000,
          fried: 18000,
        },
      },
    ],
  },
];
