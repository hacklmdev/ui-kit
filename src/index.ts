/* ── @hacklm/ui-kit public API ──────────────────────────────────
 *  Import components from here in consuming apps.
 *  e.g. import { Button, Badge, Alert } from "@hacklm/ui-kit";
 * ─────────────────────────────────────────────────────────────── */

// Brand
export { HacklmIcon, HacklmLogo } from "./components/brand/HacklmIcon";

// Primitives
export { Button } from "./components/primitives/Button";
export type { ButtonVariant, ButtonSize } from "./components/primitives/Button";
export { Input, Textarea } from "./components/primitives/Input";
export { Badge } from "./components/primitives/Badge";
export type { BadgeVariant, BadgeSize } from "./components/primitives/Badge";
export { Spinner } from "./components/primitives/Spinner";
export type { SpinnerSize } from "./components/primitives/Spinner";
export { Divider } from "./components/primitives/Divider";
export { Toggle } from "./components/primitives/Toggle";

// Typography
export { Heading, Text, InlineCode, MonoLabel } from "./components/typography/Typography";

// Layout
export { Card, CardHeader, CardBody, CardFooter, EmptyState } from "./components/layout/Card";

// Content
export { default as MarkdownContent } from "./components/content/MarkdownContent";
export { MessageBubble, MessageBubbleDemo } from "./components/content/MessageBubble";
export { ThreadListItem, ThreadList } from "./components/content/ThreadListItem";
export { ProviderBadge, ProviderPill } from "./components/content/ProviderBadge";

// Feedback
export { Alert } from "./components/feedback/Alert";
export type { AlertVariant } from "./components/feedback/Alert";
export { StatusIndicator, SaveProgressCounter } from "./components/feedback/StatusIndicator";
export type { SaveStatus } from "./components/feedback/StatusIndicator";

// Floating
export { FloatingDial } from "./components/floating/FloatingDial";
export type { DialSaveStatus } from "./components/floating/FloatingDial";

// Views
export { PopupApp } from "./components/views/PopupApp";
export { VaultDashboard } from "./components/views/VaultDashboard";

// Types
export * from "./types";

// Utils
export { cn } from "./utils/cn";
