import React from "react";

export const ZaloIcon = ({
  className = "h-5 w-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="48" height="48" rx="12" fill="#0068FF" />
    <path
      d="M34.5 24C34.5 18.2 29.8 13.5 24 13.5C18.2 13.5 13.5 18.2 13.5 24C13.5 26.8 14.6 29.4 16.4 31.3L15 35.5L19.5 34.3C20.9 34.8 22.4 35.1 24 35.1C29.8 35.1 34.5 30.4 34.5 24Z"
      fill="#0068FF"
    />
    <path
      d="M17 21H23L17 28H23M26 21V28M26 24.5H29M31 21V28M31 28H34.5"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
