
import React from "react";

const WatchlistIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
      <path d="M12 7.5c1.5 0 2.5 1 2.5 2.5 0 1.5-1 2.5-2.5 2.5-1.5 0-2.5-1-2.5-2.5 0-1.5 1-2.5 2.5-2.5Z" />
      <path d="M20.986 14.5C20.117 13.7 18.6 13 16.5 13c-1.5 0-2.81.3-3.916.736C11.476 13.3 10.18 13 8.5 13c-2.1 0-3.616.7-4.486 1.5" />
      <path d="M3 18c.6 1 2.162 3 5.5 3 2.302 0 3.466-.744 4.5-1.5 1.034.756 2.198 1.5 4.5 1.5 3.338 0 4.9-2 5.5-3" />
      <path d="M3 6s3-2 8-2 8 2 8 2" />
      <path d="M19 6v10" />
      <path d="M5 16V6" />
    </svg>
  );
};

export default WatchlistIcon;
