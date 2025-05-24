import { precacheAndRoute } from "workbox-precaching";

// Precache and route all assets
// This placeholder will be replaced by Workbox build with actual precache list
precacheAndRoute(self.__WB_MANIFEST);

// Push notification handlers
self.addEventListener("push", function (event) {
  console.log("Push received: ", event);

  if (!event.data) {
    console.log("Push event received, but no data.");
    return;
  }

  let notificationData;
  try {
    notificationData = event.data.json();
  } catch (error) {
    console.error("Error parsing push data:", error);
    notificationData = { title: "New Notification", body: event.data.text() };
  }

  const promiseChain = self.registration.showNotification(
    notificationData.title || "Story App",
    {
      body: notificationData.body || "New story added!",
      icon: "./icons/icon-72x72.png",
      badge: "./icons/badge-72x72.png",
      vibrate: [100, 50, 100],
      data: notificationData.data || {},
      actions: [
        {
          action: "explore",
          title: "Go to the site",
        },
      ],
    }
  );

  event.waitUntil(promiseChain);
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked: ", event);

  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  } else {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Message event for test notifications from the app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    console.log("Received test notification request:", event.data);

    self.registration.showNotification(
      event.data.title || "Test Notification",
      {
        body:
          event.data.body ||
          "This is a test notification from the service worker!",
        icon: "./icons/icon-72x72.png",
        badge: "./icons/badge-72x72.png",
        vibrate: [100, 50, 100],
        data: event.data.data || {},
        actions: [
          {
            action: "explore",
            title: "Go to the site",
          },
        ],
      }
    );
  }
});
