import routes from "../routes/routes";
import { getActiveRoute, parseActivePathname } from "../routes/url-parser";
import { getAuth, isAuthenticated } from "../utils/auth";
import { applyPageTransition } from "../utils/index";
import NotificationHelper from "../utils/notification-helper";
import NetworkStatus from "../utils/network-status";
import StoryNotificationService from "../utils/story-notification-service";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #authButton = null;
  #currentPage = null;
  #currentPageInstance = null;
  #notificationToggle = null;
  #notificationTry = null;
  #offlineIndicator = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#authButton = document.querySelector("#auth-button");
    this.#notificationToggle = document.querySelector("#notification-toggle");
    this.#notificationTry = document.querySelector("#try-notification");
    this.#offlineIndicator = document.querySelector("#offline-indicator");

    this.#setupDrawer();
    this.#initAuth();
    this.#initNetworkStatus();
    this.#setupNotificationButtons();
    this.#initNotificationServices();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  #initAuth() {
    this.#updateAuthButton();
    window.addEventListener("auth-changed", () => {
      this.#updateAuthButton();
      this.#updateNotificationButtons();
    });
  }

  #updateAuthButton() {
    if (isAuthenticated()) {
      const { loginResult } = getAuth();
      this.#authButton.textContent = `Logout (${loginResult.name})`;
      this.#authButton.href = "#/";
      this.#authButton.addEventListener("click", this.#handleLogout);
    } else {
      this.#authButton.textContent = "Login";
      this.#authButton.href = "#/login";
      this.#authButton.removeEventListener("click", this.#handleLogout);
    }
  }

  #handleLogout = (event) => {
    event.preventDefault();

    if (isAuthenticated()) {
      const { token } = getAuth().loginResult;
      // Unsubscribe from push notifications
      NotificationHelper.unsubscribeFromPush(token);
    }

    localStorage.removeItem("dicoding_story_auth");
    window.dispatchEvent(new CustomEvent("auth-changed"));
    window.location.hash = "#/";
  };

  #initNetworkStatus() {
    NetworkStatus.init();
    this.#updateOfflineIndicator(NetworkStatus.isOnline());

    NetworkStatus.addStatusChangeCallback((isOnline) => {
      this.#updateOfflineIndicator(isOnline);
    });
  }

  #initNotificationServices() {
    // Initialize story notification service
    StoryNotificationService.init();
  }

  #updateOfflineIndicator(isOnline) {
    if (this.#offlineIndicator) {
      if (!isOnline) {
        this.#offlineIndicator.textContent =
          "You are offline. Some features may be limited.";
        this.#offlineIndicator.classList.add("show");
      } else {
        this.#offlineIndicator.classList.remove("show");
      }
    }
  }

  #setupNotificationButtons() {
    if (this.#notificationToggle) {
      this.#updateNotificationButtons();

      this.#notificationToggle.addEventListener("click", async () => {
        if (!isAuthenticated()) {
          alert("Please login to manage notifications");
          return;
        }

        try {
          const { token } = getAuth().loginResult;
          console.log("Managing notifications with token available:", !!token);

          if (this.#isSubscribedToNotifications()) {
            console.log("Attempting to unsubscribe from push notifications");
            // User is currently subscribed, so unsubscribe
            const success = await NotificationHelper.unsubscribeFromPush(token);
            if (success) {
              this.#updateNotificationButtons();
              alert("You have unsubscribed from notifications");
            } else {
              alert("Failed to unsubscribe from notifications");
            }
          } else {
            console.log("Attempting to subscribe to push notifications");
            // User is not subscribed, so subscribe
            const success = await NotificationHelper.requestPermission(token);
            if (success) {
              this.#updateNotificationButtons();
              alert("You are now subscribed to notifications");
            } else {
              alert("Failed to subscribe to notifications");
            }
          }
        } catch (error) {
          console.error("Error managing notifications:", error);
          alert("An error occurred while managing notifications");
        }
      });
    }

    if (this.#notificationTry) {
      this.#notificationTry.addEventListener("click", async () => {
        if (!isAuthenticated()) {
          alert("Please login to try notifications");
          return;
        }

        try {
          console.log("Try notification button clicked");

          // Check if user is subscribed first
          if (!this.#isSubscribedToNotifications()) {
            console.log(
              "User not subscribed to notifications, prompting to subscribe"
            );
            const confirmSubscribe = confirm(
              "You need to subscribe to notifications first. Would you like to subscribe now?"
            );

            if (confirmSubscribe) {
              const { token } = getAuth().loginResult;
              console.log("Attempting to subscribe user to notifications");
              const success = await NotificationHelper.requestPermission(token);

              if (!success) {
                alert(
                  "Failed to subscribe to notifications. Please try again."
                );
                return;
              }

              this.#updateNotificationButtons();
            } else {
              return;
            }
          }

          console.log("Showing demo notification");
          await NotificationHelper.showDemoNotification();
        } catch (error) {
          console.error("Error showing notification:", error);
          alert("Failed to show notification");
        }
      });
    }
  }

  #isSubscribedToNotifications() {
    const data = localStorage.getItem(
      "dicoding_story_notification_subscription"
    );
    if (!data) return false;

    try {
      const { isSubscribed } = JSON.parse(data);
      return isSubscribed;
    } catch {
      return false;
    }
  }

  #updateNotificationButtons() {
    if (!this.#notificationToggle) return;

    if (!isAuthenticated()) {
      this.#notificationToggle.style.display = "none";
      if (this.#notificationTry) {
        this.#notificationTry.style.display = "none";
      }
      return;
    }

    this.#notificationToggle.style.display = "inline-flex";
    if (this.#notificationTry) {
      this.#notificationTry.style.display = "inline-flex";
    }

    const isSubscribed = this.#isSubscribedToNotifications();

    if (isSubscribed) {
      this.#notificationToggle.textContent = "Unsubscribe Notifications";
      this.#notificationToggle.dataset.subscribed = "true";
    } else {
      this.#notificationToggle.textContent = "Subscribe Notifications";
      this.#notificationToggle.dataset.subscribed = "false";
    }
  }

  // Determine which animation to use based on page navigation
  #getAnimationType(newUrl) {
    if (!this.#currentPage) return "fade"; // Default for first page load

    // Determine page categories for better transition effects
    const pageCategories = {
      home: ["/"],
      auth: ["/login", "/register"],
      content: ["/detail", "/add"],
      info: ["/about", "/map"],
    };

    const getCurrentCategory = (url) => {
      for (const [category, urls] of Object.entries(pageCategories)) {
        if (urls.some((path) => url.startsWith(path))) {
          return category;
        }
      }
      return "other";
    };

    const currentCategory = getCurrentCategory(this.#currentPage);
    const newCategory = getCurrentCategory(newUrl);

    // Choose animation type based on navigation pattern
    if (currentCategory === newCategory) {
      return "fade"; // Same category: subtle fade
    } else if (currentCategory === "auth" && newCategory === "home") {
      return "zoom"; // Login/register to home: zoom effect
    } else if (newCategory === "content") {
      return "slide"; // Content pages: slide animation
    } else {
      return "fade"; // Default animation
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];
    const urlParams = parseActivePathname();

    if (!page) {
      // Use the dedicated NotFoundPage for non-existent routes
      window.location.hash = "#/404";
      return;
    }

    try {
      // Clean up the current page if it has a destroy method
      if (
        this.#currentPageInstance &&
        typeof this.#currentPageInstance.destroy === "function"
      ) {
        await this.#currentPageInstance.destroy();
      }

      const animationType = this.#getAnimationType(url);

      // Update the rendering with our animation system
      await applyPageTransition(async () => {
        this.#content.innerHTML = await page.render(urlParams);
        await page.afterRender(urlParams);
      }, animationType);

      // Store the current URL and page instance for next transition
      this.#currentPage = url;
      this.#currentPageInstance = page;
    } catch (error) {
      console.error("Error rendering page:", error);
      this.#content.innerHTML = `
        <div class="container">
          <div class="alert alert-error">
            <p>Failed to load page content. Please try again later.</p>
          </div>
        </div>
      `;
    }
  }
}

export default App;
