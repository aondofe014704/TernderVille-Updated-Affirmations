"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js once on the client, which then unregisters itself.
 * This covers visitors who have a stale legacy service worker cached.
 *
 * Also handles the case where the user has a stale SW but never loads /sw.js
 * (because the old SW intercepts everything): explicitly unregister any
 * existing SW on every page load. After a few visits, every browser is clean.
 */
export default function ServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    (async () => {
      try {
        // 1. Unregister any existing service workers (legacy or otherwise)
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          // Don't unregister our own cleanup SW until it has done its job
          if (reg.active?.scriptURL.endsWith("/sw.js")) continue;
          await reg.unregister();
        }

        // 2. Clear all caches (legacy SW may have cached the old Vite bundle)
        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }

        // 3. Register our self-destructing SW once, so it runs the cleanup
        //    on browsers that need it. The SW unregisters itself on activate.
        const existing = await navigator.serviceWorker.getRegistration("/sw.js");
        if (!existing) {
          await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        }
      } catch (err) {
        // Non-fatal — if cleanup fails, the page still works for fresh visitors
        console.warn("[sw-cleanup] non-fatal:", err);
      }
    })();
  }, []);

  return null;
}
