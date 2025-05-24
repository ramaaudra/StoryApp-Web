// Cache name
const CACHE_NAME = "story-app-v1";

// Resources to cache
const urlsToCache = [
  "/",
  "/index.html",
  "/scripts/index.js",
  "/scripts/pages/app.js",
  "/styles/styles.css",
  "/favicon.png",
];

// Install event - cache assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing Service Worker...");
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating Service Worker...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME;
          })
          .map((cacheName) => {
            console.log("[Service Worker] Removing old cache", cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // If fetch fails (offline), try to serve the offlinePage
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});

// Handle push events for notifications
self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push Received:", event);

  let notificationData = {};

  try {
    if (event.data) {
      const dataText = event.data.text();
      console.log("[Service Worker] Push data text:", dataText);

      try {
        notificationData = JSON.parse(dataText);
        console.log(
          "[Service Worker] Push data parsed as JSON:",
          notificationData
        );
      } catch (jsonError) {
        // Log a warning instead of an error, as plain text pushes are expected from DevTools
        console.warn(
          "[Service Worker] Push data is not valid JSON. Falling back to plain text. Error:",
          jsonError.message
        );
        notificationData = {
          title: "Notification", // Generic title for non-JSON pushes
          options: {
            body: dataText, // Use the raw text as body
          },
        };
        console.log(
          "[Service Worker] Using text as notification body:",
          dataText
        );
      }
    } else {
      console.log(
        "[Service Worker] Push event has no data, using default notification."
      );
      notificationData = {
        title: "New Story",
        options: {
          body: "Someone has posted a new story",
        },
      };
    }
  } catch (error) {
    console.error("[Service Worker] Error processing push data:", error);
    notificationData = {
      title: "Notification Error",
      options: {
        body: "Could not process incoming notification.",
      },
    };
  }

  const notificationTitle = notificationData.title || "New Story";
  const notificationOptions = {
    body:
      notificationData.options && notificationData.options.body
        ? notificationData.options.body
        : "Default notification body.",
    icon: "/icons/icon-192x192.png", // Ensure this icon exists and is valid
    badge: "/icons/badge-72x72.png", // Ensure this icon exists and is valid
    data: notificationData.data || { url: "/" }, // Provide a default URL if none exists
    requireInteraction: true,
    actions: [
      {
        action: "view",
        title: "View",
      },
      {
        action: "close",
        title: "Close",
      },
    ],
  };

  console.log("[Service Worker] Showing notification:", {
    title: notificationTitle,
    options: notificationOptions,
  });

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click received", event);
  event.notification.close();

  let urlToOpen = "/";

  if (
    event.action === "view" &&
    event.notification.data &&
    event.notification.data.url
  ) {
    urlToOpen = event.notification.data.url;
  } else if (event.notification.data && event.notification.data.url) {
    urlToOpen = event.notification.data.url;
  }

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        // Check if there is already a window open
        const matchingClient = windowClients.find(
          (client) => client.url === urlToOpen
        );

        if (matchingClient) {
          return matchingClient.focus();
        }

        return clients.openWindow(urlToOpen);
      })
  );
});
