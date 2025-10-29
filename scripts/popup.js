import { addFileImportStyles, generateSettingsHTML } from "./popup/generate-html.js";
import { setupFormHandlers } from "./popup/handlers.js";
import { initRSSFeedsManager } from "./popup/rss-feeds-manager.js";
import { migrateRSSFeeds, migrateGroupsFromLegacy } from "./storage.js";
import { initGroupsManager } from './popup/groups.js';

/*
TODO:
Custom search engine
 */

// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize RSS feeds if needed
  await migrateRSSFeeds();
  // Ensure groups exist if legacy links are present
  await migrateGroupsFromLegacy();
  
  // Generate UI
  addFileImportStyles();
  generateSettingsHTML();
  setupFormHandlers();
  
  // Initialize RSS feeds manager
  initRSSFeedsManager();

  // Initialize Groups manager
  await initGroupsManager();
});