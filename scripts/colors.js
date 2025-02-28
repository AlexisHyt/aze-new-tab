// font.js - Font manager

import {
  CARD_LINK_BG_COLOR, CARD_LINK_CREATE_COLOR, CARD_LINK_TEXT_COLOR,
  CATEGORY_COLOR,
  getStorageData,
  RSS_BG_COLOR, RSS_DATE_COLOR, RSS_TITLE_COLOR
} from "./storage.js";

export async function setColor(property, color) {
  document.body.style.setProperty(property, color);
}

export async function updateColor(key, property, defaultColor = "#fff") {
  let color = await getStorageData(key);
  if (!color || Object.keys(color).length === 0) {
    color = defaultColor;
  }
  await setColor(property, color);
}

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch (request.message) {
        case 'categoryColorChanged':
          updateColor(CATEGORY_COLOR, "--category-color");
          break;
        case 'cardLinkBgColorChanged':
          updateColor(CARD_LINK_BG_COLOR, "--card-link-bg-color");
          break;
        case 'cardLinkTextColorChanged':
          updateColor(CARD_LINK_TEXT_COLOR, "--card-link-text-color");
          break;
        case 'cardLinkCreateColorChanged':
          updateColor(CARD_LINK_CREATE_COLOR, "--card-link-create-color");
          break;
        case 'rssBgColorChanged':
          updateColor(RSS_BG_COLOR, "--rss-bg-color");
          break;
        case 'rssTitleColorChanged':
          updateColor(RSS_TITLE_COLOR, "--rss-title-color");
          break;
        case 'rssDateColorChanged':
          updateColor(RSS_DATE_COLOR, "--rss-date-color");
          break;
      }
    }
  );
}, 1000)