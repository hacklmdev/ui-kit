/** Tiny class-name merger. Drop-in for clsx/cn without the dep. */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
