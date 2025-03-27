
import React from "react";

const TradesIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5-5-4 4-3 3" />
      <circle cx="14" cy="4" r="1" />
      <circle cx="8" cy="12" r="1" />
      <circle cx="17" cy="8" r="1" />
    </svg>
  );
};

export default TradesIcon;
