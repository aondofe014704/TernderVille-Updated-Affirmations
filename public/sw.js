/**
 * Self-destructing service worker.
 *
 * This file exists ONLY to clean up after the legacy Vite/PWA app that
 * previously ran on this domain. Visitors who loaded that site have a
 * stale SW in their browser; that SW intercepts requests on the new
 * Next.js site and breaks page loads.
 *
 * What this does:
 *   1. Installs as the new SW (replaces the old one)
 *   2. Skips waiting (activates immediately)
 *   3. On activate: unregisters itself, clears all caches, reloads all clients
 *
 * After every previously-affected browser visits the site once, this code
 * is gone from that browser forever. The SW deletes itself.
 *
 * Do not edit unless you actually want a real service worker. If you do,
 * replace this entire file with your own implementation.
 */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
  event.waitUntil(
    (async () => {
      try {
        // Delete every cache, no matter what named it
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));

        // Unregister this service worker
        await self.registration.unregister();

        // Reload all open tabs of this origin so they pick up the clean state
        const clients = await self.clients.matchAll({ type: "window" });
        for (const client of clients) {
          // navigate() forces a hard reload of the URL the client is on
          if ("navigate" in client) {
            await client.navigate(client.url);
          }
        }
      } catch (err) {
        console.error("[sw-cleanup] failed:", err);
      }
    })(),
  );
});

// Pass-through fetch handler. While the SW is briefly active before it
// finishes unregistering, this ensures requests are NOT intercepted/cached.
self.addEventListener("fetch", () => {
  // intentionally empty — let the browser handle the request normally
});
