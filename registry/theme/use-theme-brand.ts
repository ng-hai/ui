import { useEffect, useSyncExternalStore } from "react";

import {
  getTenant,
  initThemeBrand,
  setTenant,
  subscribe,
} from "./theme-brand";

export interface UseThemeBrand {
  /** The active tenant slug, or `null` on un-tenanted routes. */
  tenant: string | null;
  /** Set the active tenant; updates the DOM. Pass `null` to clear. */
  setTenant: (tenant: string | null) => void;
}

/**
 * React binding for the `theme-brand` controller.
 *
 * Pass the slug from your router so the brand tracks navigation:
 *
 *   const { slug } = useParams();        // e.g. /t/:slug
 *   const { tenant } = useThemeBrand(slug ?? null);
 *
 * Called with no argument, it just applies whatever tenant is in the URL on
 * mount (still pair with `THEME_BRAND_INIT_SCRIPT` to avoid the first-paint
 * flash). `tenant` re-renders when the active tenant changes.
 */
export function useThemeBrand(slug?: string | null): UseThemeBrand {
  const tenant = useSyncExternalStore(subscribe, getTenant, getTenant);

  useEffect(() => {
    if (slug !== undefined) setTenant(slug);
    else initThemeBrand();
  }, [slug]);

  return { tenant, setTenant };
}
