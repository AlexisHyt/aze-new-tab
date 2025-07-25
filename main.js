import { initializeRSSFeeds } from './scripts/rss-feed.js';
import { getCategories } from './scripts/category-manager.js';
import { updateBackgroundImage } from "./scripts/background-image.js";
import { updateFont } from "./scripts/font.js";
import { updateColor } from "./scripts/colors.js";
import { updateClockColor, updateClockShadowColor, updateMainClock } from "./scripts/clock.js";
import {
  CARD_LINK_BG_COLOR, CARD_LINK_CREATE_COLOR,
  CARD_LINK_TEXT_COLOR,
  CATEGORY_COLOR,
  RSS_BG_COLOR, RSS_DATE_COLOR, RSS_TITLE_COLOR
} from "./scripts/storage.js";
import { setupEnterListener, updateSearchInput } from "./scripts/ui-components.js";

/**
 * Initialize the extension
 */
function init() {
  // Setup clock
  updateMainClock();
  updateClockColor();
  updateClockShadowColor();

  // Update the search input
  updateSearchInput();
  setupEnterListener();


  // Update background image
  updateBackgroundImage();

  // Update Font
  updateFont();

  // Update Colors
  updateColor(CATEGORY_COLOR, "--category-color");
  updateColor(CARD_LINK_BG_COLOR, "--card-link-bg-color");
  updateColor(CARD_LINK_CREATE_COLOR, "--card-link-create-color");
  updateColor(CARD_LINK_TEXT_COLOR, "--card-link-text-color", "#000");
  updateColor(RSS_BG_COLOR, "--rss-bg-color");
  updateColor(RSS_TITLE_COLOR, "--rss-title-color", "#000");
  updateColor(RSS_DATE_COLOR, "--rss-date-color", "#000");

  // Load RSS feed
  // fetchRSSFeed("https://dev.to/feed");
  initializeRSSFeeds();

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