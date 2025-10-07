/* Minimal no-op service worker for offline capabilities scaffolding. */
/* eslint-disable no-restricted-globals */

self.addEventListener('install', (event) => {
  // Activate immediately on install
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of uncontrolled clients
  event.waitUntil(self.clients.claim());
});

// Optional: respond to manual skip waiting messages
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Placeholder fetch handler (passthrough)
self.addEventListener('fetch', () => {
  // Intentionally empty: add caching logic here if needed
});

