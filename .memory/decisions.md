# Decisions

Architectural commitments made in this project.


- [dark-mode-tokens] Dark mode uses semantic CSS tokens. Never use dark:bg-[#hex] or dark:text-[#hex]. Use: text-foreground, bg-surface, bg-surface-hover, bg-surface-raised, bg-code, bg-background. FloatingDial uses CSS var() in inline styles (e.g. var(--color-surface)) since it can't use Tailwind for inline styles.
