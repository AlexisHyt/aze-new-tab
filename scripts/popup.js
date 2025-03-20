import { addFileImportStyles, generateSettingsHTML } from "./popup/generate-html.js";
import { setupFormHandlers } from "./popup/handlers.js";

/*
TODO:
Custom search engine
 */

// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  addFileImportStyles();
  generateSettingsHTML();
  setupFormHandlers();
});