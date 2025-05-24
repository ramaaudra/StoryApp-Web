import { getToken } from "../../utils/auth";
import * as DicodingAPI from "../../data/api";
import StoryIdb from "../../data/story-idb";
import NetworkStatus from "../../utils/network-status";

export default class DetailPresenter {
  #view;
  #model;

  constructor({ view, model = DicodingAPI }) {
    this.#view = view;
    this.#model = model;
  }

  async loadStoryDetail(id) {
    if (!id) {
      this.#view.showMissingIdError();
      return;
    }

    const token = getToken();

    if (!token) {
      this.#view.showLoginRequired();
      return;
    }

    try {
      // Try to get story from IndexedDB first
      const cachedStory = await StoryIdb.getStory(id);

      // If we're offline and have the story cached, show it
      if (!NetworkStatus.isOnline() && cachedStory) {
        console.log("Loading story detail from IndexedDB while offline");
        this.#view.displayStoryDetail(cachedStory);

        // Initialize map if coordinates are available
        if (cachedStory.lat && cachedStory.lon) {
          this.#view.initMap(cachedStory);
        }

        return;
      }

      // If we're online, fetch from the API
      if (NetworkStatus.isOnline()) {
        const response = await this.#model.getStoryDetail({ id, token });

        if (response.error) {
          throw new Error(response.message);
        }

        // Save detailed story to IndexedDB
        await StoryIdb.putStory(response.story);

        this.#view.displayStoryDetail(response.story);

        // Initialize map if coordinates are available
        if (response.story.lat && response.story.lon) {
          this.#view.initMap(response.story);
        }
      } else if (!cachedStory) {
        // We're offline and don't have this story cached
        this.#view.showError(
          "You are offline and this story is not available offline."
        );
      }
    } catch (error) {
      console.error("loadStoryDetail: error:", error);

      // Try to get story from IndexedDB if API request fails
      try {
        const cachedStory = await StoryIdb.getStory(id);
        if (cachedStory) {
          console.log("Error loading from API, falling back to IndexedDB");
          this.#view.displayStoryDetail(cachedStory);

          // Initialize map if coordinates are available
          if (cachedStory.lat && cachedStory.lon) {
            this.#view.initMap(cachedStory);
          }

          return;
        }
      } catch (idbError) {
        console.error("Error accessing IndexedDB:", idbError);
      }

      this.#view.showError(error.message);
    }
  }
}
