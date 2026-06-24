/**
 * theme-mode — light / dark / system controller for SPAs.
 *
 * Framework-agnostic core: plain DOM + localStorage + a tiny pub/sub, so it
 * binds to any framework (React via `use-theme-mode.ts`, or call directly).
 *
 * Mode is a *device-local* preference (the OS/user choice), defaulting to
 * `"system"`. The account's saved preference, once known after login, is
 * reconciled in via `syncModeFromAccount`.
 *
 * No-flash: paste `THEME_MODE_INIT_SCRIPT` as a blocking <script> in index.html
 * so the `.dark` class is set before first paint. Everything here runs after the
 * bundle loads and keeps it in sync from there.
 */

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedMode = "light" | "dark";

const STORAGE_KEY = "theme-mode";
const DARK_CLASS = "dark";

/**
 * Blocking init for index.html — runs before paint to avoid a flash of the
 * wrong mode. Self-contained (no imports); keep its storage key ("theme-mode")
 * and dark class ("dark") in sync with the constants above.
 *
 *   <script>{THEME_MODE_INIT_SCRIPT}</script>   // in <head>, before the bundle
 */
export const THEME_MODE_INIT_SCRIPT = `(function(){try{var v=localStorage.getItem("theme-mode"),m=v==="light"||v==="dark"||v==="system"?v:"system",d=m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches),e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();`;

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark" || value === "system";
}

function systemPrefersDark(): boolean {
  return (
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/** The persisted preference, or `"system"` when unset/unavailable. */
export function getStoredMode(): ThemeMode {
  if (typeof localStorage === "undefined") return "system";
  const stored = localStorage.getItem(STORAGE_KEY);
  return isThemeMode(stored) ? stored : "system";
}

/** Collapse a mode to the concrete `"light"` | `"dark"` actually rendered. */
export function resolveMode(mode: ThemeMode): ResolvedMode {
  if (mode === "system") return systemPrefersDark() ? "dark" : "light";
  return mode;
}

let currentMode: ThemeMode = getStoredMode();

function applyResolved(resolved: ResolvedMode): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle(DARK_CLASS, resolved === "dark");
  root.style.colorScheme = resolved;
}

// --- subscriptions ---------------------------------------------------------

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

let systemMql: MediaQueryList | null = null;

function handleSystemChange(): void {
  if (currentMode !== "system") return;
  applyResolved(resolveMode("system"));
  emit();
}

function ensureSystemListener(): void {
  if (systemMql || typeof matchMedia === "undefined") return;
  systemMql = matchMedia("(prefers-color-scheme: dark)");
  systemMql.addEventListener("change", handleSystemChange);
}

/** Subscribe to mode changes; returns an unsubscribe fn. Attaches the system
 *  listener on first subscribe so `"system"` tracks the OS automatically. */
export function subscribe(listener: () => void): () => void {
  ensureSystemListener();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// --- reads / writes --------------------------------------------------------

/** Current preference (`light` | `dark` | `system`). Stable for snapshots. */
export function getMode(): ThemeMode {
  return currentMode;
}

/** Current rendered mode (`light` | `dark`). Stable for snapshots. */
export function getResolvedMode(): ResolvedMode {
  return resolveMode(currentMode);
}

/** Set the preference, apply it to the DOM, persist, and notify subscribers. */
export function setMode(mode: ThemeMode): void {
  currentMode = mode;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, mode);
  }
  applyResolved(resolveMode(mode));
  emit();
}

/** Flip between light and dark based on what's currently rendered. */
export function toggleMode(): void {
  setMode(getResolvedMode() === "dark" ? "light" : "dark");
}

/**
 * Apply the stored mode to the DOM and start tracking the OS preference.
 * Call once at startup (e.g. in main.tsx) for correctness without the inline
 * script; pair it with `THEME_MODE_INIT_SCRIPT` to also avoid the first-paint
 * flash. The React hook calls this for you.
 */
export function initThemeMode(): void {
  ensureSystemListener();
  applyResolved(resolveMode(currentMode));
}

/**
 * Reconcile with the account's saved preference once it's known (after login).
 * A no-op when there's nothing to sync or it already matches, so it's safe to
 * call on every auth resolution.
 */
export function syncModeFromAccount(accountMode: ThemeMode | null | undefined): void {
  if (!isThemeMode(accountMode) || accountMode === currentMode) return;
  setMode(accountMode);
}
