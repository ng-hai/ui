/**
 * theme-brand — per-tenant brand theming for static SPAs, keyed off the URL.
 *
 * The active tenant comes from the path (`/t/<slug>`), so the URL is the single
 * source of truth — no storage, unlike `theme-mode` (which is a device-local
 * preference). Setting `data-tenant="<slug>"` on <html> activates the matching
 * `:root[data-tenant="<slug>"]` block in the generated `tenants.css`. An unknown
 * or absent slug matches nothing and falls back to the neutral default theme.
 *
 * Brand (this file) and mode (`theme-mode`) are independent axes — the generated
 * `:root[data-tenant="acme"].dark` block is just their cross product.
 *
 * No-flash: keep `tenants.css` a render-blocking <link> in <head>, and paste
 * `THEME_BRAND_INIT_SCRIPT` as a blocking <script> before the bundle so the slug
 * is on <html> before first paint. Because the tenant is in the URL, it's known
 * synchronously — no post-login swap needed.
 */

export const TENANT_ATTR = "data-tenant";

/** Matches the tenant slug in `/t/<slug>` (and `/t/<slug>/...`). */
const ROUTE = /^\/t\/([^/]+)/;

/**
 * Blocking init for index.html — runs before paint so the brand is correct on
 * first pixel. Self-contained (no imports); keep its route shape (`/t/<slug>`)
 * and attribute name ("data-tenant") in sync with the constants above.
 *
 *   <script>{THEME_BRAND_INIT_SCRIPT}</script>   // in <head>, before the bundle
 */
export const THEME_BRAND_INIT_SCRIPT = `(function(){try{var m=location.pathname.match(/^\\/t\\/([^\\/]+)/);var e=document.documentElement;if(m){e.setAttribute("data-tenant",m[1]);}else{e.removeAttribute("data-tenant");}}catch(_){}})();`;

/** Parse the tenant slug from a path, or `null` when there isn't one. */
export function tenantFromPath(pathname: string): string | null {
  const match = ROUTE.exec(pathname);
  return match ? match[1] : null;
}

let currentTenant: string | null =
  typeof location !== "undefined" ? tenantFromPath(location.pathname) : null;

function applyTenant(tenant: string | null): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (tenant) root.setAttribute(TENANT_ATTR, tenant);
  else root.removeAttribute(TENANT_ATTR);
}

// --- subscriptions ---------------------------------------------------------

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

/** Subscribe to tenant changes; returns an unsubscribe fn. */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// --- reads / writes --------------------------------------------------------

/** The currently applied tenant slug (or `null`). Stable for snapshots. */
export function getTenant(): string | null {
  return currentTenant;
}

/** Set the active tenant, apply it to the DOM, and notify subscribers. */
export function setTenant(tenant: string | null): void {
  if (tenant === currentTenant) return;
  currentTenant = tenant;
  applyTenant(tenant);
  emit();
}

/**
 * Re-read the tenant from the current URL and apply it. Call on client-side
 * route changes (the URL is the source of truth), e.g. in a router effect.
 */
export function syncTenantFromLocation(): void {
  if (typeof location === "undefined") return;
  setTenant(tenantFromPath(location.pathname));
}

/**
 * Apply the current tenant to the DOM on startup. Call once at boot for
 * correctness without the inline script; pair it with `THEME_BRAND_INIT_SCRIPT`
 * to also avoid the first-paint flash. The React hook calls this for you.
 */
export function initThemeBrand(): void {
  applyTenant(currentTenant);
}
