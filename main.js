import { updateRSSFeed } from './scripts/rss-feed.js';
import { getCategories } from './scripts/category-manager.js';
import { updateBackgroundImage } from "./scripts/background-image.js";
import { updateFont } from "./scripts/font.js";
import { updateMainColors, updateAccentColors } from "./scripts/colors.js";
import { updateMainClock } from "./scripts/clock.js";

/**
 * Initialize the extension
 */
function init() {
  // Setup clock
  updateMainClock();

  // Update background image
  updateBackgroundImage();

  // Update Font
  updateFont();

  // Update Colors
  updateMainColors();
  updateAccentColors();

  // Load RSS feed
  // fetchRSSFeed("https://dev.to/feed");
  updateRSSFeed();

  // Load categories
  getCategories();
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
  document.body.style.display = 'block';
}