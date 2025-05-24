import { precacheAndRoute } from "workbox-precaching";

// Do precaching - this is required for injectManifest strategy
precacheAndRoute(self.__WB_MANIFEST);

// Handle push notifications
self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push Received:", event);

  let notificationTitle = "New Story";
  let notificationOptions = {
    body: "Someone has posted a new story",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    data: { url: "/" },
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

  if (event.data) {
    const dataText = event.data.text();
    console.log("[Service Worker] Push data text:", dataText);

    try {
      const notificationData = JSON.parse(dataText);
      console.log(
        "[Service Worker] Push data parsed as JSON:",
        notificationData
      );

      notificationTitle = notificationData.title || "New Story";
      notificationOptions.body =
        notificationData.options?.body || "Default notification body.";
      notificationOptions.data = notificationData.data || { url: "/" };
    } catch (jsonError) {
      console.warn(
        "[Service Worker] Push data is not valid JSON. Using plain text. Error:",
        jsonError.message
      );
      notificationOptions.body = dataText;
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click received", event);
  event.notification.close();

  let urlToOpen = "/";

  if (event.action === "view" && event.notification.data?.url) {
    urlToOpen = event.notification.data.url;
  } else if (event.notification.data?.url) {
    urlToOpen = event.notification.data.url;
  }

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
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
