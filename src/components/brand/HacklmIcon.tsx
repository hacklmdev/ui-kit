/* ── HacklmIcon / HacklmLogo ──────────────────────────────────────
 *  Standalone version (no chrome.runtime dependency).
 *  Provide `iconSrc` for a real PNG; omits that prop for a simple
 *  orange-circle "H" placeholder inside Storybook.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Explicit image URL — pass this in production pages. */
  iconSrc?: string;
}

/** Fallback SVG rendered when no iconSrc is available. */
function PlaceholderIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HackLM logo"
    >
      <rect width="48" height="48" rx="10" fill="#fb631b" />
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontWeight="700"
        fontSize="28"
        fill="#fff"
      >
        H
      </text>
    </svg>
  );
}

export function HacklmIcon({ size = 24, className, style, iconSrc }: IconProps) {
  if (iconSrc) {
    return (
      <img
        src={iconSrc}
        width={size}
        height={size}
        alt="HackLM"
        className={className}
        style={style}
        draggable={false}
      />
    );
  }
  return <PlaceholderIcon size={size} />;
}

export function HacklmLogo({ size = 24, className, style, iconSrc }: IconProps) {
  return (
    <div
      className={`flex items-center gap-2 ${className ?? ""}`}
      style={style}
    >
      <HacklmIcon size={size} iconSrc={iconSrc} />
      <div className="flex flex-col leading-none">
        <span className="font-mono text-[11px] font-semibold tracking-tight text-black dark:text-[#e8e8e8]">
          AI Chat Backup
        </span>
        <span className="font-mono text-[9px] text-faint tracking-tight">
          by HackLM
        </span>
      </div>
    </div>
  );
}
