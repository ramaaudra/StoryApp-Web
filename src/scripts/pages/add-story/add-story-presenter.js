import { getToken } from "../../utils/auth";
import * as DicodingAPI from "../../data/api";
import StoryNotificationService from "../../utils/story-notification-service";

export default class AddStoryPresenter {
  #view;
  #model;

  constructor({ view, model = DicodingAPI }) {
    this.#view = view;
    this.#model = model;
  }

  checkAuth() {
    const token = getToken();

    if (!token) {
      this.#view.showLoginRequired();
      return false;
    }

    return true;
  }

  async createStory(description, photo, location) {
    const token = getToken();

    if (!token) {
      this.#view.showLoginRequired();
      return false;
    }

    try {
      this.#view.setLoading(true);

      const response = await this.#model.addStory({
        description,
        photo,
        lat: location?.lat,
        lon: location?.lon,
        token,
      });

      if (response.error) {
        throw new Error(response.message);
      }

      this.#view.showSuccess(
        "Story created successfully! Redirecting to home..."
      );

      // After successfully creating a story, broadcast a notification
      if (response.story) {
        StoryNotificationService.broadcastNewStory(response.story, true);
        this.#triggerLocalStoryNotification(description);
      }

      setTimeout(() => {
        window.location.hash = "#/";
      }, 2000);

      return true;
    } catch (error) {
      console.error("createStory: error:", error);
      this.#view.showError(
        error.message || "Failed to create story. Please try again."
      );
      return false;
    } finally {
      this.#view.setLoading(false);
    }
  }

  async #triggerLocalStoryNotification(description) {
    try {
      // Show a local notification to the user about their own story being published
      if (
        "serviceWorker" in navigator &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        const registration = await navigator.serviceWorker.ready;
        const truncatedDesc =
          description.length > 30
            ? description.substring(0, 30) + "..."
            : description;

        registration.showNotification("Story Published!", {
          body: `Your story has been published successfully: "${truncatedDesc}"`,
          icon: "/icons/icon-192x192.png",
          badge: "/icons/badge-72x72.png",
          vibrate: [100, 50, 100],
          data: {
            url: "#/",
            createdAt: new Date().toISOString(),
          },
        });
      }
    } catch (error) {
      console.error("Failed to trigger story notification:", error);
      // Don't throw the error to avoid interrupting the main flow
    }
  }

  validateFormData(description, imageFile) {
    if (!imageFile) {
      this.#view.showError("Please capture a photo or upload an image.");
      return false;
    }

    if (!description.trim()) {
      this.#view.showError("Please enter a story description.");
      return false;
    }

    return true;
  }
}
