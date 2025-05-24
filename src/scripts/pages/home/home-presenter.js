import { getToken } from "../../utils/auth";
import * as DicodingAPI from "../../data/api";
import StoryIdb from "../../data/story-idb";
import NetworkStatus from "../../utils/network-status";

export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model = DicodingAPI }) {
    this.#view = view;
    this.#model = model;
  }

  async loadStories() {
    try {
      const token = getToken();

      if (!token) {
        this.#view.showLoginRequired();
        return;
      }

      // Try loading from IndexedDB first
      const offlineStories = await StoryIdb.getStories();

      // If we're offline and have cached stories, show them
      if (!NetworkStatus.isOnline() && offlineStories.length > 0) {
        console.log("Loading stories from IndexedDB while offline");
        this.#view.displayStories(offlineStories);
        return;
      }

      // If we're online, fetch from the API
      if (NetworkStatus.isOnline()) {
        const response = await this.#model.getStories({ token });

        if (response.error) {
          throw new Error(response.message);
        }

        if (!response.listStory || response.listStory.length === 0) {
          this.#view.showEmptyStories();
          return;
        }

        // Save stories to IndexedDB for offline access
        await StoryIdb.saveStories(response.listStory);

        this.#view.displayStories(response.listStory);
      } else if (offlineStories.length === 0) {
        // We're offline and have no cached data
        this.#view.showError(
          "You are offline and have no cached stories. Please connect to the internet."
        );
      }
    } catch (error) {
      console.error("loadStories: error:", error);

      // Try to show cached stories if available when an error occurs
      try {
        const offlineStories = await StoryIdb.getStories();
        if (offlineStories.length > 0) {
          console.log("Error loading from API, falling back to IndexedDB");
          this.#view.displayStories(offlineStories);
          return;
        }
      } catch (idbError) {
        console.error("Error accessing IndexedDB:", idbError);
      }

      this.#view.showError(error.message);
    }
  }
}
