export const className = {
  nav: "sticky top-0 z-40 w-full py-4 bg-background/95 backdrop-blur",
  container:
    "mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16",
  logo: "w-24 md:w-28 h-auto text-white",
  menuDesktop: "hidden items-center gap-6 md:flex",
  menuMobile:
    "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
  menuMobileContent: "px-4 pb-4 flex flex-col gap-2",
  navLink:
    "text-sm font-medium text-secondary hover:text-primary hover:cursor-pointer transition flex items-center gap-2",
  navLinkMobile: "py-2 text-secondary flex items-center gap-2",
  hamburgerButton: "relative h-8 w-8 md:hidden text-primary",
  hamburgerLine:
    "absolute left-0 h-0.5 w-full bg-primary transition-all duration-300",
  icon: "w-5 h-5 text-secondary",
} as const;
