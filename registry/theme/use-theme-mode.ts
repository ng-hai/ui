import { useEffect, useSyncExternalStore } from "react";

import {
  getMode,
  getResolvedMode,
  initThemeMode,
  setMode,
  subscribe,
  type ResolvedMode,
  type ThemeMode,
} from "./theme-mode";

export interface UseThemeMode {
  /** The stored preference: `light` | `dark` | `system`. */
  mode: ThemeMode;
  /** The concrete mode actually rendered: `light` | `dark`. */
  resolvedMode: ResolvedMode;
  /** Set the preference; persists and updates the DOM. */
  setMode: (mode: ThemeMode) => void;
}

/**
 * React binding for the `theme-mode` controller.
 *
 *   const { mode, resolvedMode, setMode } = useThemeMode();
 *
 * `mode` re-renders when the preference changes; `resolvedMode` also re-renders
 * when `mode` is `"system"` and the OS flips. Applies the stored mode on mount,
 * so it works even without the index.html init script (which is still the
 * recommended way to avoid the first-paint flash).
 *
 * After login, reconcile the account preference with `syncModeFromAccount`
 * from `./theme-mode` — e.g. `syncModeFromAccount(account?.themeMode)`.
 */
export function useThemeMode(): UseThemeMode {
  const mode = useSyncExternalStore(subscribe, getMode, getMode);
  const resolvedMode = useSyncExternalStore(subscribe, getResolvedMode, getResolvedMode);

  useEffect(() => {
    initThemeMode();
  }, []);

  return { mode, resolvedMode, setMode };
}
