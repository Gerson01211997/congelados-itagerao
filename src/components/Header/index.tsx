"use client";

import { memo } from "react";
import Cart from "@/components/Cart";
import { className } from "@/components/Header/styles";
import Image from "next/image";
import NavMenu from "../NavMenu";

function Header() {
  return (
    <nav className={className.nav}>
      <div className={className.container}>
        <div className="flex items-center gap-1 flex-row max-w-40">
          <Image src="/logo.png" alt="Logo" width={70} height={70} />
          <span className="text-primary font-bold text-2xl leading-6">
            Congelados Itagerao
          </span>
        </div>

        <div className="flex row gap-4">
          <div className={className.menuDesktop}>
            <NavMenu />
          </div>
          <Cart />
        </div>
      </div>
    </nav>
  );
}

export default memo(Header);
