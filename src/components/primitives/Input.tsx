/* ── Input / Textarea ────────────────────────────────────────────
 *  A monospace-first text field that inherits design tokens.
 *  Sizes: sm | md (default) | lg
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import { cn } from "@/utils/cn";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  label?: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const baseInput =
  "w-full bg-white dark:bg-[#1a1a1a] border border-grid rounded-sm " +
  "font-mono text-black dark:text-[#e8e8e8] placeholder:text-faint " +
  "transition focus:outline-none focus:ring-1 focus:ring-accent/50 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const sizeClasses: Record<InputSize, string> = {
  sm:  "text-[10px] px-2 py-1",
  md:  "text-xs px-3 py-2",
  lg:  "text-sm px-4 py-2.5",
};

export function Input({
  inputSize = "md",
  label,
  hint,
  error,
  iconLeft,
  iconRight,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[10px] font-mono text-muted tracking-tight"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {iconLeft && (
          <span className="absolute left-2.5 text-faint pointer-events-none">
            {iconLeft}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            baseInput,
            sizeClasses[inputSize],
            iconLeft ? "pl-7" : "",
            iconRight ? "pr-7" : "",
            error ? "border-red-400 focus:ring-red-300" : "",
            className,
          )}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-2.5 text-faint pointer-events-none">
            {iconRight}
          </span>
        )}
      </div>
      {(hint || error) && (
        <p className={`text-[10px] font-mono ${error ? "text-red-500" : "text-faint"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

/* ── Textarea ────────────────────────────────────────────────── */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, className, id, ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="text-[10px] font-mono text-muted tracking-tight">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          baseInput,
          "text-xs px-3 py-2 resize-y min-h-[80px]",
          error ? "border-red-400 focus:ring-red-300" : "",
          className,
        )}
        {...props}
      />
      {(hint || error) && (
        <p className={`text-[10px] font-mono ${error ? "text-red-500" : "text-faint"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
