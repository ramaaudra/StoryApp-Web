import fs from "fs";
import path from "path";

// Post-build script to add push notification handlers to the generated service worker
const addPushNotificationHandlers = () => {
  const swPath = path.join(process.cwd(), "dist", "sw.js");

  if (!fs.existsSync(swPath)) {
    console.error("Service worker file not found at:", swPath);
    return;
  }

  const pushNotificationCode = `
// Push Notification Handlers
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
        console.warn(
          "[Service Worker] Push data is not valid JSON. Falling back to plain text. Error:",
          jsonError.message
        );
        notificationData = {
          title: "Notification",
          options: {
            body: dataText,
          },
        };
      }
    } else {
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
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    data: notificationData.data || { url: "/" },
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

console.log("[Service Worker] Push notification handlers added");
`;

  try {
    let swContent = fs.readFileSync(swPath, "utf8");

    // Add push notification handlers at the end of the service worker file
    swContent += pushNotificationCode;

    fs.writeFileSync(swPath, swContent);
    console.log("✅ Push notification handlers added to service worker");
  } catch (error) {
    console.error("❌ Error adding push notification handlers:", error);
  }
};

addPushNotificationHandlers();
