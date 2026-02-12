import { memo } from "react";

function PaymentTerminalIcon({ className }: { className?: string }) {
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
      <title>Icono de Pago Contactless</title>

      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />

      <line x1="9" y1="6" x2="15" y2="6" />

      <path d="M12 12a4 4 0 0 1 4 4" />
      <path d="M12 15a1.5 1.5 0 0 1 1.5 1.5" />
    </svg>
  );
}

export default memo(PaymentTerminalIcon);
