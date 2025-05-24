import CONFIG from "../config";
import { subscribeNotification, unsubscribeNotification } from "../data/api";

const LOCAL_SUBSCRIPTION_KEY = "dicoding_story_notification_subscription";

const NotificationHelper = {
  isNotificationAvailable() {
    return "Notification" in window;
  },

  isNotificationGranted() {
    return Notification.permission === "granted";
  },

  async requestPermission(token) {
    if (!this.isNotificationAvailable()) {
      console.log("Browser does not support notifications");
      alert("Browser does not support notifications");
      return false;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      alert("Notification permission denied");
      return false;
    }

    const subscribed = await this._registerServiceWorker();
    if (subscribed) {
      const pushSubscribed = await this._subscribeUserToPush(token);
      if (pushSubscribed) {
        this._saveSubscriptionState(true);
        return true;
      }
    }

    return false;
  },

  async _registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      console.log("Service Worker not supported");
      return false;
    }

    try {
      // Wait for the service worker that was automatically registered by Vite PWA plugin
      console.log("Waiting for service worker to be ready...");

      // First check if there's already an active service worker
      if (navigator.serviceWorker.controller) {
        console.log(
          "Service worker already active:",
          navigator.serviceWorker.controller.scriptURL
        );
        return true;
      }

      // Wait for service worker to be ready with a timeout
      const registration = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Service worker ready timeout")),
            10000
          )
        ),
      ]);

      console.log("Service worker ready with scope:", registration.scope);
      console.log("Service worker state:", registration.active?.state);

      // If the service worker is not active, wait for it to activate
      if (registration.active?.state !== "activated") {
        console.log("Waiting for service worker to activate...");
        await new Promise((resolve) => {
          const checkState = () => {
            if (registration.active?.state === "activated") {
              resolve();
            } else {
              setTimeout(checkState, 100);
            }
          };
          checkState();
        });
      }

      console.log("Service worker is now active and ready");
      return true;
    } catch (error) {
      console.error("Service worker not ready", error);
      return false;
    }
  },

  async _subscribeUserToPush(token) {
    if (!("PushManager" in window)) {
      console.log("Push notifications not supported");
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // First, unsubscribe from any existing subscriptions to avoid duplicates
      const existingSubscription =
        await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log("Unsubscribing from existing push subscription");
        await existingSubscription.unsubscribe();
      }

      // Create a new subscription
      console.log("Creating new push subscription with VAPID key");
      console.log("VAPID key:", CONFIG.VAPID_PUBLIC_KEY);

      const applicationServerKey = this._urlB64ToUint8Array(
        CONFIG.VAPID_PUBLIC_KEY
      );

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      });

      const subscriptionJson = subscription.toJSON();
      console.log("New push subscription created:", subscriptionJson);

      // Send the subscription to the server
      const success = await this._sendSubscriptionToServer(subscription, token);
      if (!success) {
        console.error("Failed to send subscription to server, unsubscribing");
        await subscription.unsubscribe();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to subscribe for push notifications:", error);
      return false;
    }
  },

  async _sendSubscriptionToServer(subscription, token) {
    const subscriptionJson = subscription.toJSON();

    try {
      console.log(
        "Sending subscription to server with token:",
        token ? "Valid token" : "No token"
      );
      console.log("Subscription details:", {
        endpoint: subscriptionJson.endpoint,
        keys: subscriptionJson.keys,
      });

      const response = await subscribeNotification({
        endpoint: subscriptionJson.endpoint,
        keys: subscriptionJson.keys,
        token,
      });

      console.log("Server response:", response);

      if (!response.error) {
        console.log("Push notification subscription successful", response);
        return true;
      } else {
        console.error("Subscription to server failed:", response);
        return false;
      }
    } catch (error) {
      console.error("Failed to send subscription to server", error);
      return false;
    }
  },

  async getPushSubscription() {
    if (!("serviceWorker" in navigator)) {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) return null;

      return await registration.pushManager.getSubscription();
    } catch (error) {
      console.error("Error getting push subscription:", error);
      return null;
    }
  },

  async isCurrentPushSubscriptionAvailable() {
    const subscription = await this.getPushSubscription();
    return !!subscription;
  },

  async unsubscribeFromPush(token) {
    try {
      const subscription = await this.getPushSubscription();

      if (!subscription) {
        this._saveSubscriptionState(false);
        return true;
      }

      const subscriptionJson = subscription.toJSON();

      console.log(
        "Unsubscribing from push with endpoint:",
        subscriptionJson.endpoint
      );

      const response = await unsubscribeNotification({
        endpoint: subscriptionJson.endpoint,
        token,
      });

      const unsubscribed = await subscription.unsubscribe();
      if (!unsubscribed) {
        console.error("Failed to unsubscribe from push manager");
        return false;
      }

      console.log("Push notification unsubscribed", response);
      this._saveSubscriptionState(false);
      return true;
    } catch (error) {
      console.error("Failed to unsubscribe from push notifications", error);
      return false;
    }
  },

  async showDemoNotification() {
    if (!this.isNotificationAvailable()) {
      alert("Notifications are not supported in this browser");
      return;
    }

    try {
      if (!this.isNotificationGranted()) {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          alert("You need to allow notification permission first");
          return;
        }
      }

      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();

        if (registrations.length === 0) {
          console.log("No service worker registered, registering now");
          await this._registerServiceWorker();
        }

        try {
          const registration = await navigator.serviceWorker.ready;

          const notificationOptions = {
            body: "This is a test notification from Dicoding Story App",
            icon: "/icons/icon-192x192.png",
            badge: "/icons/badge-72x72.png",
            vibrate: [100, 50, 100],
            data: {
              url: window.location.href,
              timestamp: new Date().getTime(),
            },
          };

          await registration.showNotification(
            "Demo Notification",
            notificationOptions
          );
          console.log("Notification shown via Service Worker");
          return;
        } catch (swError) {
          console.error("Service Worker notification failed:", swError);
          // Fall back to regular notification API
        }
      }

      // Fallback to regular Notification API
      const notification = new Notification("Demo Notification", {
        body: "This is a test notification from Dicoding Story App",
        icon: "/icons/icon-192x192.png",
      });

      notification.onclick = function () {
        console.log("Notification clicked");
        window.focus();
        this.close();
      };

      console.log("Notification shown via Notification API");
    } catch (error) {
      console.error("Error showing demo notification:", error);
      alert("Failed to show notification: " + error.message);
    }
  },

  _saveSubscriptionState(isSubscribed) {
    localStorage.setItem(
      LOCAL_SUBSCRIPTION_KEY,
      JSON.stringify({
        isSubscribed,
        timestamp: new Date().getTime(),
      })
    );
  },

  isSubscribed() {
    const data = localStorage.getItem(LOCAL_SUBSCRIPTION_KEY);
    if (!data) return false;

    try {
      const { isSubscribed } = JSON.parse(data);
      return isSubscribed;
    } catch {
      return false;
    }
  },

  _urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },
};

export default NotificationHelper;
