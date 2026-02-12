import { memo } from "react";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span
      className={`
            ${className}
          inline-block
          w-20 h-5
          rounded-2xl
          bg-linear-to-r from-gray-200 via-gray-300 to-gray-200
          bg-size-[200%_100%]
          animate-skeleton
        `}
    />
  );
}

export default memo(Skeleton);
