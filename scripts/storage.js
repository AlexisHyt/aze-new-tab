// storage.js - Chrome storage helper functions

export const STORAGE_KEY = 'links';
export const BACKGROUND_KEY = 'background';
export const FONT_FAMILY_KEY = 'font-family';

export const MAIN_COLOR = 'main-color';
export const ACCENT_COLOR = 'accent-color';

export const CATEGORY_COLOR = 'category-color';

export const CARD_LINK_BG_COLOR = 'card-link-bg-color';
export const CARD_LINK_TEXT_COLOR = 'card-link-text-color';
export const CARD_LINK_SHOW_TITLE = 'card-link-show-title';

export const RSS_URL = 'rss-url';
export const RSS_BG_COLOR = 'rss-bg-color';
export const RSS_TITLE_COLOR = 'rss-title-color';
export const RSS_DATE_COLOR = 'rss-date-color';

export const CLOCK_COLOR = 'clock-color';
export const CLOCK_STYLE = 'clock-style';
export const CLOCK_SHOW_SECONDS = 'clock-show-seconds';

/**
 * Get data from Chrome sync storage
 * @param {string} key - Storage key
 * @returns {Promise<Object>} - Retrieved data
 */
export async function getStorageData(key) {
  const result = await chrome.storage.sync.get(key);
  return result[key] || {};
}

/**
 * Save data to Chrome sync storage
 * @param {Object} data - Data to store
 * @param {string} key - Storage key
 * @returns {Promise<void>}
 */
export async function setStorageData(data, key) {
  await chrome.storage.sync.set({ [key]: data });
}
