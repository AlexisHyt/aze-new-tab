import { addFileImportStyles, generateSettingsHTML } from "./popup/generate-html.js";
import { setupFormHandlers } from "./popup/handlers.js";

/*
TODO:
Save/load themes (same as presets but only colors and styles)
 */

// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  addFileImportStyles();
  generateSettingsHTML();
  setupFormHandlers();
});