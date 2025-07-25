// RSS Feeds Manager - Handles the UI for managing multiple RSS feeds
import { getStorageData, setStorageData, RSS_FEEDS, ACTIVE_RSS_FEED } from "../storage.js";
import { isEmpty, sendMessageToActiveTab } from "./helpers.js";

/**
 * Initialize the RSS feeds manager
 */
export async function initRSSFeedsManager() {
  // Set up event listeners
  const addButton = document.getElementById('add-feed-btn');
  if (addButton) {
    addButton.addEventListener('click', addNewFeed);
  }

  // Load and display existing feeds
  await loadRSSFeeds();
}

/**
 * Load RSS feeds from storage and display them in the UI
 */
async function loadRSSFeeds() {
  const feedsList = document.getElementById('rss-feeds-list');
  if (!feedsList) return;

  const feeds = await getStorageData(RSS_FEEDS) || [];
  const activeIndex = isEmpty(await getStorageData(ACTIVE_RSS_FEED)) ? 0 : await getStorageData(ACTIVE_RSS_FEED);
  
  // Clear the list
  feedsList.innerHTML = '';
  
  if (feeds.length === 0) {
    feedsList.innerHTML = '<p class="no-feeds-message">No feeds added yet.</p>';
    return;
  }
  
  // Create a list item for each feed
  feeds.forEach((feed, index) => {
    const feedItem = document.createElement('div');
    feedItem.className = 'feed-item';
    if (index === activeIndex) {
      feedItem.classList.add('active');
    }
    
    feedItem.innerHTML = `
      <div class="feed-item-info">
        <div class="feed-item-name">${feed.name || 'Unnamed Feed'}</div>
        <div class="feed-item-url">${feed.url}</div>
      </div>
      <div class="feed-item-actions">
        <button class="set-active-btn" data-index="${index}">Set Active</button>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
    
    feedsList.appendChild(feedItem);
  });
  
  // Add event listeners to the buttons
  feedsList.querySelectorAll('.set-active-btn').forEach(button => {
    button.addEventListener('click', () => setActiveFeed(parseInt(button.dataset.index)));
  });
  
  feedsList.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', () => editFeed(parseInt(button.dataset.index)));
  });
  
  feedsList.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => deleteFeed(parseInt(button.dataset.index)));
  });
}

/**
 * Add a new RSS feed
 */
async function addNewFeed() {
  const nameInput = document.getElementById('new-feed-name');
  const urlInput = document.getElementById('new-feed-url');
  
  if (!nameInput || !urlInput) return;
  
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();
  
  if (!url) {
    alert('Please enter a feed URL');
    return;
  }
  
  // Get existing feeds
  const feeds = await getStorageData(RSS_FEEDS) || [];
  
  // Add the new feed
  feeds.push({
    name: name || `Feed ${feeds.length + 1}`,
    url
  });
  
  // Save the updated feeds
  await setStorageData(feeds, RSS_FEEDS);
  
  // Clear the inputs
  nameInput.value = '';
  urlInput.value = '';
  
  // Reload the feeds list
  await loadRSSFeeds();
  
  // Notify the active tab
  sendMessageToActiveTab('rssTabsChanged');
}

/**
 * Set the active RSS feed
 * @param {number} index - Index of the feed to set as active
 */
async function setActiveFeed(index) {
  const feeds = await getStorageData(RSS_FEEDS) || [];
  
  if (index < 0 || index >= feeds.length) {
    console.error(`Invalid feed index: ${index}`);
    return;
  }
  
  // Set the active feed
  await setStorageData(index, ACTIVE_RSS_FEED);
  
  // Reload the feeds list to update the UI
  await loadRSSFeeds();
  
  // Notify the active tab
  sendMessageToActiveTab('rssFeedChanged');
}

/**
 * Edit an existing RSS feed
 * @param {number} index - Index of the feed to edit
 */
async function editFeed(index) {
  const feeds = await getStorageData(RSS_FEEDS) || [];
  
  if (index < 0 || index >= feeds.length) {
    console.error(`Invalid feed index: ${index}`);
    return;
  }
  
  const feed = feeds[index];
  
  // Prompt for new values
  const newName = prompt('Enter feed name:', feed.name);
  if (newName === null) return; // User cancelled
  
  const newUrl = prompt('Enter feed URL:', feed.url);
  if (newUrl === null) return; // User cancelled
  
  // Update the feed
  feeds[index] = {
    name: newName.trim() || feed.name,
    url: newUrl.trim() || feed.url
  };
  
  // Save the updated feeds
  await setStorageData(feeds, RSS_FEEDS);
  
  // Reload the feeds list
  await loadRSSFeeds();
  
  // Notify the active tab
  sendMessageToActiveTab('rssTabsChanged');
  
  // If this was the active feed, update the feed display
  const activeIndex = isEmpty(await getStorageData(ACTIVE_RSS_FEED)) ? 0 : await getStorageData(ACTIVE_RSS_FEED);
  if (index === activeIndex) {
    sendMessageToActiveTab('rssFeedChanged');
  }
}

/**
 * Delete an RSS feed
 * @param {number} index - Index of the feed to delete
 */
async function deleteFeed(index) {
  const feeds = await getStorageData(RSS_FEEDS) || [];
  
  if (index < 0 || index >= feeds.length) {
    console.error(`Invalid feed index: ${index}`);
    return;
  }
  
  // Confirm deletion
  if (!confirm(`Are you sure you want to delete the feed "${feeds[index].name}"?`)) {
    return;
  }
  
  // Get the active feed index
  let activeIndex = isEmpty(await getStorageData(ACTIVE_RSS_FEED)) ? 0 : await getStorageData(ACTIVE_RSS_FEED);
  
  // Remove the feed
  feeds.splice(index, 1);
  
  // Update the active feed index if needed
  if (feeds.length === 0) {
    activeIndex = 0;
  } else if (index === activeIndex) {
    // If the deleted feed was active, set the first feed as active
    activeIndex = 0;
  } else if (index < activeIndex) {
    // If the deleted feed was before the active feed, decrement the active index
    activeIndex--;
  }
  
  // Save the updated feeds and active index
  await setStorageData(feeds, RSS_FEEDS);
  await setStorageData(activeIndex, ACTIVE_RSS_FEED);
  
  // Reload the feeds list
  await loadRSSFeeds();
  
  // Notify the active tab
  sendMessageToActiveTab('rssTabsChanged');
  sendMessageToActiveTab('rssFeedChanged');
}