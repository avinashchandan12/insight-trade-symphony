
import React from "react";

const StrategyIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
      <path d="M10 2v8L4.72 18.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45L14 10V2" />
      <path d="M10 16h4" />
      <path d="M2 16h3" />
      <path d="M19 16h3" />
    </svg>
  );
};

export default StrategyIcon;
