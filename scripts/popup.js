import { addFileImportStyles, generateSettingsHTML } from "./popup/generate-html.js";
import { setupFormHandlers } from "./popup/handlers.js";
import { initRSSFeedsManager } from "./popup/rss-feeds-manager.js";
import { migrateRSSFeeds } from "./storage.js";

/*
TODO:
Custom search engine
 */

// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize RSS feeds if needed
  await migrateRSSFeeds();
  
  // Generate UI
  addFileImportStyles();
  generateSettingsHTML();
  setupFormHandlers();
  
  // Initialize RSS feeds manager
  initRSSFeedsManager();
});