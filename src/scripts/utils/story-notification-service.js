/**
 * Story Notification Service
 *
 * This service enhances the notification system by:
 * 1. Monitoring story creations
 * 2. Broadcasting notifications when new stories are created
 * 3. Providing utilities for story notification management
 */

import CONFIG from "../config";
import { getAuth, isAuthenticated } from "./auth";
import NotificationHelper from "./notification-helper";

const STORY_EVENT_KEY = "DICODING_STORY_EVENT";

const StoryNotificationService = {
  /**
   * Initialize the notification service
   */
  init() {
    this._setupEventListeners();
    console.log("Story Notification Service initialized");
  },

  /**
   * Set up listeners for story events
   */
  _setupEventListeners() {
    window.addEventListener(
      "story-created",
      this._handleStoryCreated.bind(this)
    );
    console.log("Story creation event listener registered");
  },

  /**
   * Handle story creation events
   * @param {CustomEvent} event - The story created event
   */
  async _handleStoryCreated(event) {
    try {
      console.log("Story creation event received:", event.detail);
      const { story, byCurrentUser } = event.detail || {};

      if (!story) {
        console.warn("No story data in the event");
        return;
      }

      // If the current user created the story, they already get a notification
      if (byCurrentUser) {
        console.log("Story created by current user, skipping notification");
        return;
      }

      // Check if notifications are available and permission is granted
      if (
        !NotificationHelper.isNotificationAvailable() ||
        !NotificationHelper.isNotificationGranted()
      ) {
        console.warn("Notifications not available or permission not granted");
        return;
      }

      // Show notification about new story from another user
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;

          if (!registration) {
            console.error("No service worker registration available");
            return;
          }

          // Prepare notification data
          const truncatedDesc =
            story.description?.length > 30
              ? story.description.substring(0, 30) + "..."
              : story.description || "";

          const notificationTitle = "New Story Available";
          const notificationBody = `${
            story.name || "Someone"
          } shared: "${truncatedDesc}"`;

          console.log("Preparing to show notification:", {
            title: notificationTitle,
            body: notificationBody,
            story: story.id,
          });

          // Format notification according to the API schema
          await registration.showNotification(notificationTitle, {
            body: notificationBody,
            icon: story.photoUrl || "/icons/icon-192x192.png",
            badge: "/icons/badge-72x72.png",
            vibrate: [100, 50, 100],
            image: story.photoUrl,
            data: {
              url: `#/detail/${story.id}`,
              storyId: story.id,
              createdAt: story.createdAt || new Date().toISOString(),
            },
          });

          console.log("Story notification displayed for story:", story.id);
        } catch (swError) {
          console.error("Service worker notification error:", swError);
        }
      } else {
        console.warn("ServiceWorker not available for notifications");
      }
    } catch (error) {
      console.error("Error handling story notification:", error);
    }
  },

  /**
   * Broadcast a notification about a new story
   * @param {Object} story - The story data
   * @param {Boolean} byCurrentUser - Whether the current user created the story
   */
  broadcastNewStory(story, byCurrentUser = true) {
    if (!story) {
      console.warn("Cannot broadcast notification: No story data provided");
      return;
    }

    // Log the story broadcasting
    console.log("Broadcasting story notification:", {
      storyId: story.id,
      byCurrentUser,
      description:
        story.description?.substring(0, 30) + "..." || "No description",
    });

    // Store the recently created story in localStorage
    this._saveRecentStory(story);

    // Dispatch a custom event that our service is listening for
    const eventDetail = { story, byCurrentUser };
    window.dispatchEvent(
      new CustomEvent("story-created", {
        detail: eventDetail,
      })
    );

    console.log("Story notification event dispatched for story:", story.id);

    // If it's not the current user's story, also try to send a server push notification
    if (!byCurrentUser && isAuthenticated()) {
      this._triggerServerPushNotification(story.id);
    }
  },

  /**
   * Trigger a server-side push notification (if applicable)
   * @param {String} storyId - The ID of the story
   * @private
   */
  async _triggerServerPushNotification(storyId) {
    try {
      if (!isAuthenticated()) {
        console.log(
          "User not authenticated, skipping server push notification"
        );
        return;
      }

      // This would typically be an API call to trigger server-side notifications
      console.log("Would trigger server push notification for story:", storyId);

      // Note: Implementation depends on your API
    } catch (error) {
      console.error("Error triggering server push notification:", error);
    }
  },

  /**
   * Save a recent story to localStorage
   * @param {Object} story - The story to save
   */
  _saveRecentStory(story) {
    if (!story) return;

    try {
      const recentStories = JSON.parse(
        localStorage.getItem(STORY_EVENT_KEY) || "[]"
      );

      // Add new story at the beginning
      recentStories.unshift({
        id: story.id,
        name: story.name,
        description: story.description,
        photoUrl: story.photoUrl,
        createdAt: story.createdAt || new Date().toISOString(),
        seen: false,
      });

      // Keep only the 10 most recent stories
      const updatedStories = recentStories.slice(0, 10);

      localStorage.setItem(STORY_EVENT_KEY, JSON.stringify(updatedStories));
      console.log("Story saved to recent stories:", story.id);
    } catch (error) {
      console.error("Error saving recent story:", error);
    }
  },

  /**
   * Get recent stories from localStorage
   * @returns {Array} Array of recent stories
   */
  getRecentStories() {
    try {
      return JSON.parse(localStorage.getItem(STORY_EVENT_KEY) || "[]");
    } catch (error) {
      console.error("Error getting recent stories:", error);
      return [];
    }
  },

  /**
   * Mark a story as seen
   * @param {String} storyId - The ID of the story to mark as seen
   */
  markStorySeen(storyId) {
    if (!storyId) return;

    try {
      const recentStories = this.getRecentStories();
      const updatedStories = recentStories.map((story) => {
        if (story.id === storyId) {
          return { ...story, seen: true };
        }
        return story;
      });

      localStorage.setItem(STORY_EVENT_KEY, JSON.stringify(updatedStories));
      console.log("Story marked as seen:", storyId);
    } catch (error) {
      console.error("Error marking story as seen:", error);
    }
  },

  /**
   * Check if user can receive notifications
   * @returns {Boolean} Whether user can receive notifications
   */
  canReceiveNotifications() {
    return (
      NotificationHelper.isNotificationAvailable() &&
      NotificationHelper.isNotificationGranted() &&
      NotificationHelper.isSubscribed()
    );
  },
};

export default StoryNotificationService;
