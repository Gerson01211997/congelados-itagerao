import Image from "next/image";
import { memo } from "react";

function Banner() {
  return (
    <section>
      <div className="relative h-70 w-full overflow-hidden bg-banner flex items-center">
        <div className="relative z-10 w-full md:max-w-[55%] px-4 md:pl-8 flex flex-col items-center md:items-start">
          <div className="block">
            <h2 className="text-secondary font-bold text-3xl leading-tight">
              Deditos, empanadas, panzerottis y combos{" "}
              <span className="font-normal">listos para freír</span>
            </h2>

            <p className="text-secondary mt-2">Pedidos rápidos por WhatsApp</p>
          </div>
          <div className="mt-4 flex flex-row gap-3 justify-center md:justify-start">
            <button
              type="button"
              className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium whitespace-nowrap"
            >
              Ver combos
            </button>
            <button
              type="button"
              className="bg-white text-orange-500 px-5 py-2 rounded-lg font-medium border whitespace-nowrap"
            >
              Ver menú
            </button>
          </div>
        </div>
        <div className="absolute inset-0 md:-inset-10 z-0">
          <Image
            src="/Banner.png"
            alt="Deditos, empanadas y combos"
            fill
            className="object-contain object-right opacity-40 blur-sm md:opacity-100 md:blur-none transition-all duration-500"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default memo(Banner);
