// storage.js - Chrome storage helper functions

export const SEARCH_ENGINE = 'search-engine';

export const LINKS_KEY = 'links';
export const BACKGROUND_KEY = 'background';
export const FONT_FAMILY_KEY = 'font-family';

export const CATEGORY_COLOR = 'category-color';

export const CARD_LINK_BG_COLOR = 'card-link-bg-color';
export const CARD_LINK_TEXT_COLOR = 'card-link-text-color';
export const CARD_LINK_CREATE_COLOR = 'card-link-create-color';
export const CARD_LINK_SHOW_TITLE = 'card-link-show-title';

export const RSS_FEEDS = 'rss-feeds';
export const RSS_BG_COLOR = 'rss-bg-color';
export const RSS_TITLE_COLOR = 'rss-title-color';
export const RSS_DATE_COLOR = 'rss-date-color';
export const ACTIVE_RSS_FEED = 'active-rss-feed';

export const CLOCK_COLOR = 'clock-color';
export const CLOCK_SHADOW_COLOR = 'clock-shadow-color';
export const CLOCK_STYLE = 'clock-style';
export const CLOCK_SHOW_SECONDS = 'clock-show-seconds';

export const SEARCH = "search-engine";
export const LINKS = "links";
export const RSS = "rss";
export const BACKGROUND = "background";
export const FONT = "font";
export const COLORS = "colors";
export const CLOCKSTYLE = "clock-style";

export const PRESETS_KEY = 'presets';

// Groups storage
export const GROUPS_KEY = 'groups';
export const ACTIVE_GROUP_KEY = 'active-group';

export const CATEGORIES = {
  [SEARCH]: [
    SEARCH_ENGINE
  ],
  // NOTE: LINKS are intentionally excluded from presets per new Groups system
  // [LINKS]: [
  //   LINKS_KEY,
  //   CARD_LINK_SHOW_TITLE,
  // ],
  [RSS]: [
    RSS_FEEDS,
    ACTIVE_RSS_FEED
  ],
  [BACKGROUND]: [
    BACKGROUND_KEY
  ],
  [FONT]: [
    FONT_FAMILY_KEY
  ],
  [COLORS]: [
    CATEGORY_COLOR,
    CARD_LINK_BG_COLOR,
    CARD_LINK_TEXT_COLOR,
    CARD_LINK_CREATE_COLOR,
    CARD_LINK_BG_COLOR,
    RSS_BG_COLOR,
    RSS_TITLE_COLOR,
    RSS_DATE_COLOR,
    CLOCK_COLOR,
    CLOCK_SHADOW_COLOR,
  ],
  [CLOCKSTYLE]: [
    CLOCK_STYLE,
    CLOCK_SHOW_SECONDS,
  ],
}

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

/**
 * Initialize RSS feeds if they don't exist
 * @returns {Promise<void>}
 */
export async function migrateRSSFeeds() {
  try {
    const existingFeeds = await getStorageData(RSS_FEEDS);
    
    // Initialize feeds array with a default feed if none exists
    if (!existingFeeds || Object.keys(existingFeeds).length === 0) {
      const defaultFeeds = [
        {
          name: 'Dev.to',
          url: 'https://dev.to/feed'
        }
      ];
      await setStorageData(defaultFeeds, RSS_FEEDS);
      await setStorageData(0, ACTIVE_RSS_FEED);
    }
  } catch (error) {
    console.error('Error initializing RSS feeds:', error);
  }
}

/**
 * Migration: If Groups do not exist but legacy LINKS exist, create a Default group
 */
export async function migrateGroupsFromLegacy() {
  try {
    const groups = await getStorageData(GROUPS_KEY);
    const hasGroups = groups && Object.keys(groups).length > 0;

    if (!hasGroups) {
      const legacyLinks = await getStorageData(LINKS_KEY);
      const hasLegacyLinks = legacyLinks && Object.keys(legacyLinks).length > 0;

      if (hasLegacyLinks) {
        const defaultName = 'Default';
        const newGroups = { [defaultName]: { links: legacyLinks } };
        await setStorageData(newGroups, GROUPS_KEY);
        await setStorageData(defaultName, ACTIVE_GROUP_KEY);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error migrating Groups from legacy LINKS:', error);
    return false;
  }
}
