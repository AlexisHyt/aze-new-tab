// rss-feed.js - RSS feed fetching and rendering

import {getStorageData, RSS_URL} from "./storage.js";

export const RSS_CONTAINER_NAME = "rss-feed"

/**
 * Fetch and display RSS feed
 * @param {string} url - RSS feed URL
 */
export async function fetchRSSFeed(url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const xml = new DOMParser().parseFromString(data, "text/xml");
    const image = xml.querySelector("image");
    const items = xml.querySelectorAll("item");

    if (image) {
      const rssImageWrapper = document.querySelector("#rss-img-wrapper");
      const rssImage = document.querySelector("#rss-img");
      rssImageWrapper.style.display = "flex";
      rssImage.src = image.querySelector("url").textContent;
    } else {
      const rssImageWrapper = document.querySelector("#rss-img-wrapper");
      const rssImage = document.querySelector("#rss-img");
      rssImageWrapper.style.display = "none";
      rssImage.src = "";
    }

    const container = document.getElementById(RSS_CONTAINER_NAME);
    if (!container) {
      console.error(`Container with ID ${RSS_CONTAINER_NAME} not found`);
      return;
    }

    container.innerHTML = ""; // Clear previous content

    items.forEach((item) => {
      const title = item.querySelector("title")?.textContent || "No title";
      const link = item.querySelector("link")?.textContent || "#";
      const pubDate = new Date(item.querySelector("pubDate")?.textContent).toLocaleDateString();

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
      container.innerHTML = "<p>Failed to load RSS feed. Please try again later.</p>";
    }
  }
}

/**
 * Fetch stored feed
 * @returns {Promise<void>}
 */
export async function updateRSSFeed() {
  const url = await getStorageData(RSS_URL);
  fetchRSSFeed(url);
}

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "rssFeedChanged" ) {
        updateRSSFeed();
      }
    }
  );
}, 1000)