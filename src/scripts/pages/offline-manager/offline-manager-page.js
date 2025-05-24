import { showFormattedDate } from "../../utils";
import StoryManager from "../../utils/story-manager";

export default class OfflineManagerPage {
  async render() {
    return `
      <section class="container" aria-labelledby="offline-manager-heading">
        <div class="form-container">
          <h2 id="offline-manager-heading" class="form-title">Manage Offline Stories</h2>
          
          <div class="form-info">
            <p>This page allows you to manage stories that are stored offline on your device. You can view and delete individual stories or clear all stories that are older than 7 days.</p>
          </div>
          
          <div class="form-actions">
            <button id="clear-old-stories" class="btn">Clear Stories Older Than 7 Days</button>
          </div>
          
          <div id="offline-stories-container" class="offline-stories-container">
            <div class="loader-container">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await this.loadOfflineStories();
    this.initEventListeners();
  }

  async loadOfflineStories() {
    const storiesContainer = document.getElementById(
      "offline-stories-container"
    );

    try {
      const stories = await StoryManager.getStoriesFromIdb();

      if (stories.length === 0) {
        storiesContainer.innerHTML = `
          <div class="alert">
            <p>No stories are stored offline.</p>
          </div>
        `;
        return;
      }

      const storiesHtml = stories
        .map(
          (story) => `
        <div class="offline-story-item" data-id="${story.id}">
          <div class="offline-story-content">
            <h3>${story.name}</h3>
            <p>${this.truncateText(story.description, 100)}</p>
            <div class="offline-story-meta">
              <span>Saved on: ${showFormattedDate(story.createdAt)}</span>
              <div class="offline-story-actions">
                <a href="#/detail/${
                  story.id
                }" class="btn btn-outline btn-small">View</a>
                <button class="btn btn-outline btn-small delete-story" data-id="${
                  story.id
                }">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `
        )
        .join("");

      storiesContainer.innerHTML = `
        <div class="offline-stories-list">
          ${storiesHtml}
        </div>
      `;

      // Add event listeners to delete buttons
      const deleteButtons = document.querySelectorAll(".delete-story");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
          const storyId = event.target.dataset.id;
          await this.deleteStory(storyId);
        });
      });
    } catch (error) {
      console.error("Error loading offline stories:", error);
      storiesContainer.innerHTML = `
        <div class="alert alert-error">
          <p>Error loading offline stories: ${error.message}</p>
        </div>
      `;
    }
  }

  initEventListeners() {
    const clearOldStoriesButton = document.getElementById("clear-old-stories");
    if (clearOldStoriesButton) {
      clearOldStoriesButton.addEventListener("click", async () => {
        await this.clearOldStories();
      });
    }
  }

  async deleteStory(id) {
    if (
      confirm(
        "Are you sure you want to delete this story from offline storage?"
      )
    ) {
      await StoryManager.deleteStory(id);
      await this.loadOfflineStories(); // Reload the list
    }
  }

  async clearOldStories() {
    if (
      confirm("Are you sure you want to clear all stories older than 7 days?")
    ) {
      const deletedCount = await StoryManager.clearOldStories(7);
      alert(
        `${deletedCount} old stories have been cleared from offline storage.`
      );
      await this.loadOfflineStories(); // Reload the list
    }
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }
}
