/* ── MarkdownContent ─────────────────────────────────────────────
 *  Renders markdown using react-markdown + remark-gfm.
 *  Overflow handling matches DataPort conventions.
 * ─────────────────────────────────────────────────────────────── */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="overflow-x-auto max-w-full rounded bg-code px-3 py-2 text-xs font-mono"
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }) => (
    <code
      {...props}
      className="break-all rounded bg-code px-1 py-0.5 text-xs font-mono"
    >
      {children}
    </code>
  ),
  img: ({ ...props }) => (
    <img {...props} className="max-w-full h-auto block rounded" />
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto max-w-full">
      <table {...props} className="border-collapse text-xs">
        {children}
      </table>
    </div>
  ),
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="break-all text-accent underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

interface MarkdownContentProps {
  children: string;
  className?: string;
}

export default function MarkdownContent({ children, className }: MarkdownContentProps) {
  return (
    <div
      className={`prose prose-sm max-w-none overflow-hidden [overflow-wrap:break-word] dark:prose-invert ${className ?? ""}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
