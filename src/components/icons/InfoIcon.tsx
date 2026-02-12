import { memo } from "react";

function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />

      <line x1="12" y1="16" x2="12" y2="12" />

      <line x1="12" y1="8" x2="12" y2="8" />
    </svg>
  );
}

export default memo(InfoIcon);
