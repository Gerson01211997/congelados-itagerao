import Header from "@/components/Header";
import CartSidePanel from "@/modules/home/components/sidePanel";
import { TranslationProvider } from "@/contexts/TranslationContext";

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      <Header />
      <CartSidePanel />
      {children}
    </TranslationProvider>
  );
}

export default AppProvider;
