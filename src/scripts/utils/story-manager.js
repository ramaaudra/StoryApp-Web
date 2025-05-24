import StoryIdb from "../data/story-idb";

const StoryManager = {
  // Save a story to IndexedDB
  async saveStory(story) {
    await StoryIdb.putStory(story);
    console.log(`Story with ID ${story.id} saved to IndexedDB`);
    return story;
  },

  // Delete a story from IndexedDB
  async deleteStory(id) {
    try {
      await StoryIdb.deleteStory(id);
      console.log(`Story with ID ${id} deleted from IndexedDB`);
      return true;
    } catch (error) {
      console.error(`Error deleting story with ID ${id}:`, error);
      return false;
    }
  },

  // Clear old stories (older than specified days)
  async clearOldStories(daysToKeep = 7) {
    try {
      const stories = await StoryIdb.getStories();
      const now = new Date();
      const cutoffDate = new Date(now.setDate(now.getDate() - daysToKeep));

      let deletedCount = 0;

      for (const story of stories) {
        const storyDate = new Date(story.createdAt);
        if (storyDate < cutoffDate) {
          await StoryIdb.deleteStory(story.id);
          deletedCount++;
        }
      }

      console.log(`Cleared ${deletedCount} old stories from IndexedDB`);
      return deletedCount;
    } catch (error) {
      console.error("Error clearing old stories:", error);
      return 0;
    }
  },

  // Get all stories from IndexedDB
  async getStoriesFromIdb() {
    return await StoryIdb.getStories();
  },
};

export default StoryManager;
