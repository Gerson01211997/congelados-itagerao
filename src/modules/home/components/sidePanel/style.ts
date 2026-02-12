export const className = {
  overlay: (isOpen: boolean, hasTransaction: boolean) =>
    `fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-in-out ${
      isOpen && hasTransaction
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`,
  panel: (isOpen: boolean, hasTransaction: boolean) =>
    `fixed z-50 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out w-full bottom-0 left-0 h-[80vh] rounded-t-2xl ${
      isOpen && hasTransaction ? "translate-y-0" : "translate-y-full"
    } md:top-0 md:right-0 md:bottom-auto md:left-auto md:h-full md:max-w-md md:rounded-l-3xl md:rounded-tr-none md:translate-y-0 ${
      isOpen && hasTransaction ? "md:translate-x-0" : "md:translate-x-full"
    }`,
  closeButtonContainer: "flex justify-end px-4 py-4",
  closeButton:
    "rounded-lg p-1 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300",
  content: "px-8 pt-0 pb-12 overflow-y-auto h-[calc(100%-60px)]",
  header: "text-center pb-8 mb-8",
  iconContainer: "flex justify-center mb-6",
  title: "text-xl font-semibold text-gray-800 mb-2",
  amount: "text-4xl font-bold text-bold-blue mb-2",
  date: "text-sm text-bold-gray",
  details: "space-y-6",
  detailRow: "flex justify-between items-center text-sm",
  detailLabel: "text-bold-gray font-semibold",
  detailValue: "text-sm text-bold-gray",
  deductionValue: "font-medium text-bold-red",
  divider: "border-t border-gray-400",
  paymentMethodRow: "flex items-center space-x-2",
  textBlack: "text-black font-semibold",
} as const;
