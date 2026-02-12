import { memo } from "react";

function SliderFilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>Icono de Filtrar</title>

      <line x1="3" y1="6" x2="7" y2="6" />
      <line x1="14" y1="6" x2="23" y2="6" />
      <circle cx="10" cy="6" r="3" />

      <line x1="3" y1="18" x2="12" y2="18" />
      <line x1="20" y1="18" x2="24" y2="18" />
      <circle cx="16" cy="18" r="3" />
    </svg>
  );
}

export default memo(SliderFilterIcon);
