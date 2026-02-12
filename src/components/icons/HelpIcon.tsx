import { memo } from "react";

function HelpIcon({ className = "" }: { className?: string }) {
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
      <path d="M9 9a3 3 0 1 1 6 0c0 2-3 2-3 4" />
      <line x1="12" y1="17" x2="12" y2="17" />
    </svg>
  );
}
export default memo(HelpIcon);
