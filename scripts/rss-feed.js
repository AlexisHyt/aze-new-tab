// rss-feed.js - RSS feed fetching and rendering

import {
  getStorageData,
  setStorageData,
  RSS_FEEDS, 
  ACTIVE_RSS_FEED, 
  migrateRSSFeeds
} from "./storage.js";
import { isEmpty } from "./popup/helpers.js";

export const RSS_IMAGE_WRAPPER_NAME = "rss-img-wrapper"
export const RSS_CONTAINER_NAME = "rss-feed"
export const RSS_TABS_CONTAINER_NAME = "rss-tabs"

/**
 * Initialize RSS feeds
 */
export async function initializeRSSFeeds() {
  await migrateRSSFeeds();
  await updateRSSFeed();
  setupRSSTabs();
}

/**
 * Set up RSS tabs for navigation between feeds
 */
async function setupRSSTabs() {
  const feeds = await getStorageData(RSS_FEEDS);
  const activeIndex = isEmpty(await getStorageData(ACTIVE_RSS_FEED)) ? 0 : await getStorageData(ACTIVE_RSS_FEED);
  
  // Create tabs container if it doesn't exist
  let tabsContainer = document.getElementById(RSS_TABS_CONTAINER_NAME);
  if (!tabsContainer) {
    tabsContainer = document.createElement('div');
    tabsContainer.id = RSS_TABS_CONTAINER_NAME;
    tabsContainer.className = 'rss-tabs';
    
    // Insert before the RSS feed container
    const rssContainer = document.getElementById(RSS_CONTAINER_NAME);
    if (rssContainer && rssContainer.parentNode) {
      rssContainer.parentNode.insertBefore(tabsContainer, rssContainer);
    }
  }
  
  // Clear existing tabs
  tabsContainer.innerHTML = '';
  
  // If no feeds, hide tabs and return
  if (!feeds || isEmpty(feeds) || feeds.length === 0) {
    tabsContainer.style.display = 'none';
    return;
  }
  
  // Show tabs container
  tabsContainer.style.display = 'flex';
  
  // Create a tab for each feed
  feeds.forEach((feed, index) => {
    const tab = document.createElement('div');
    tab.className = 'rss-tab';
    if (index === activeIndex) {
      tab.classList.add('active');
    }
    tab.textContent = feed.name || `Feed ${index + 1}`;
    tab.dataset.index = index;
    
    tab.addEventListener('click', () => switchRSSFeed(index));
    
    tabsContainer.appendChild(tab);
  });
}

/**
 * Switch to a different RSS feed
 * @param {number} index - Index of the feed to switch to
 */
export async function switchRSSFeed(index) {
  const feeds = await getStorageData(RSS_FEEDS);
  
  if (!feeds || isEmpty(feeds) || !feeds[index]) {
    console.error(`Feed at index ${index} not found`);
    return;
  }
  
  // Update active feed index in storage
  await getStorageData(ACTIVE_RSS_FEED);
  await setStorageData(index, ACTIVE_RSS_FEED);
  
  // Update tabs
  const tabs = document.querySelectorAll(`#${RSS_TABS_CONTAINER_NAME} .rss-tab`);
  tabs.forEach((tab, i) => {
    if (i === index) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  // Fetch and display the selected feed
  fetchRSSFeed(feeds[index].url);
}

/**
 * Fetch and display RSS feed
 * @param {string} url - RSS feed URL
 */
export async function fetchRSSFeed(url) {
  if (!url || isEmpty(url)) {
    document.getElementById(RSS_IMAGE_WRAPPER_NAME).style.display = "none";
    const container = document.getElementById(RSS_CONTAINER_NAME);
    if (container) {
      container.style.display = "block";
      container.innerHTML = "<p>No RSS feeds configured. Please add a feed in the extension settings.</p>";
    }
    return;
  }

  try {
    // Fetch the RSS feed
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    if (!data || data.trim() === '') {
      throw new Error('Empty response received from RSS feed');
    }
    
    // Parse the XML
    const xml = new DOMParser().parseFromString(data, "text/xml");
    if (xml.querySelector('parsererror')) {
      throw new Error('Invalid XML received from RSS feed');
    }
    
    // Get the image and items
    const image = xml.querySelector("image");
    const items = xml.querySelectorAll("item");
    
    if (!items || items.length === 0) {
      throw new Error('No items found in RSS feed');
    }

    // Handle the image
    const rssImageWrapper = document.querySelector("#rss-img-wrapper");
    const rssImage = document.querySelector("#rss-img");
    
    if (image && image.querySelector("url") && image.querySelector("url").textContent) {
      rssImageWrapper.style.display = "flex";
      rssImage.src = image.querySelector("url").textContent;
    } else {
      rssImageWrapper.style.display = "none";
      rssImage.src = "";
    }

    // Get the container
    const container = document.getElementById(RSS_CONTAINER_NAME);
    if (!container) {
      console.error(`Container with ID ${RSS_CONTAINER_NAME} not found`);
      return;
    }

    // Clear previous content
    container.innerHTML = "";
    container.style.display = "block";

    // Add each item to the container
    items.forEach((item) => {
      const title = item.querySelector("title")?.textContent || "No title";
      const link = item.querySelector("link")?.textContent || "#";
      let pubDate = "";
      
      try {
        if (item.querySelector("pubDate")?.textContent) {
          pubDate = new Date(item.querySelector("pubDate").textContent).toLocaleDateString();
        }
      } catch (dateError) {
        console.warn("Error parsing date:", dateError);
      }

      const article = document.createElement("div");
      article.classList.add("rss-card");
      article.innerHTML = `
        <h3><a href="${link}" target="_blank">${title}</a></h3>
      `;
      
      if (pubDate) {
        article.innerHTML += `
          <span class="rss-date">${pubDate}</span>
        `;
      }

      container.appendChild(article);
    });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    const container = document.getElementById(RSS_CONTAINER_NAME);
    if (container) {
      container.style.display = "block";
      container.innerHTML = `<p>Failed to load RSS feed: ${error.message || 'Unknown error'}. Please try again later or check the feed URL.</p>`;
    }
  }
}

/**
 * Fetch stored feed
 * @returns {Promise<void>}
 */
export async function updateRSSFeed() {
  const feeds = await getStorageData(RSS_FEEDS);
  const activeIndex = isEmpty(await getStorageData(ACTIVE_RSS_FEED)) ? 0 : await getStorageData(ACTIVE_RSS_FEED);

  if (feeds && !isEmpty(feeds) && feeds.length > 0 && feeds[activeIndex]) {
    // Use the active feed from the feeds array
    fetchRSSFeed(feeds[activeIndex].url);
  } else {
    // No feeds available
    fetchRSSFeed("");
  }
}

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "rssFeedChanged") {
        updateRSSFeed();
        setupRSSTabs();
      } else if (request.message === "rssTabsChanged") {
        setupRSSTabs();
      }
    }
  );
}, 1000)