import type { FlameTier } from "@/lib/streak";

type FlameIconProps = {
  tier?: FlameTier;
  className?: string;
  size?: number;
};

export const FlameIcon = ({
  tier = "red",
  className = "h-6 w-6",
  size,
}: FlameIconProps) => {
  // Config mau sac gradient dua theo cap do lua
  const gradientConfigs = {
    unlit: {
      from: "#cbd5e1",
      to: "#94a3b8",
      innerFrom: "#f1f5f9",
      innerTo: "#cbd5e1",
      glow: "none",
    },
    red: {
      from: "#ff7a00",
      to: "#ff3b30",
      innerFrom: "#ffe600",
      innerTo: "#ff9500",
      glow: "drop-shadow(0 0 6px rgba(255, 122, 0, 0.45))",
    },
    blue: {
      from: "#00d2ff",
      to: "#0072ff",
      innerFrom: "#80eaff",
      innerTo: "#00aaff",
      glow: "drop-shadow(0 0 8px rgba(0, 180, 255, 0.55))",
    },
    purple: {
      from: "#d946ef",
      to: "#7e22ce",
      innerFrom: "#f5d0fe",
      innerTo: "#c084fc",
      glow: "drop-shadow(0 0 8px rgba(192, 132, 252, 0.6))",
    },
    ultra_purple: {
      from: "#f43f5e",
      to: "#9333ea",
      innerFrom: "#fbcfe8",
      innerTo: "#e879f9",
      glow: "drop-shadow(0 0 12px rgba(232, 121, 249, 0.8)) drop-shadow(0 0 4px #ec4899)",
    },
  };

  const config = gradientConfigs[tier] || gradientConfigs.red;
  const gradientId = `flame-grad-${tier}`;
  const innerGradientId = `flame-inner-${tier}`;

  return (
    <svg
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size ? `${size}px` : undefined,
        height: size ? `${Math.round((size * 36) / 32)}px` : undefined,
        filter: config.glow,
      }}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="16"
          y1="2"
          x2="16"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={config.from} />
          <stop offset="100%" stopColor={config.to} />
        </linearGradient>

        <linearGradient
          id={innerGradientId}
          x1="16"
          y1="14"
          x2="16"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={config.innerFrom} />
          <stop offset="100%" stopColor={config.innerTo} />
        </linearGradient>
      </defs>

      {/* Ngon lua ngoai */}
      <path
        d="M16.2 2C16.2 2 10.5 7.5 10.5 13.2C10.5 14.8 11 16.3 11.9 17.5C10.2 16.8 8.8 15.3 8.3 13.6C6.2 16.3 5 19.8 5 23.5C5 29.3 9.9 34 16 34C22.1 34 27 29.3 27 23.5C27 16.8 21.8 11.2 18.2 6.5C17.2 5.1 16.5 3.5 16.2 2Z"
        fill={`url(#${gradientId})`}
      />

      {/* Ngon lua nhan ben trong */}
      <path
        d="M16 14C16 14 13 17.5 13 20.8C13 22.1 13.5 23.2 14.2 24C13.5 23.5 12.8 22.5 12.8 21.2C11.8 22.8 11.2 24.5 11.2 26.2C11.2 29.4 13.4 32 16 32C18.6 32 20.8 29.4 20.8 26.2C20.8 22.5 18.5 19.2 17 16.5C16.5 15.6 16.2 14.8 16 14Z"
        fill={`url(#${innerGradientId})`}
        opacity="0.95"
      />
    </svg>
  );
};
