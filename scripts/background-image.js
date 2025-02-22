// background-image.js - Background image of new tab

import {BACKGROUND_KEY, getStorageData} from "./storage.js";

/**
 * Update background image
 * @returns {Promise<void>}
 */
export async function updateBackgroundImage() {
  const currentBackgroundImage = window.getComputedStyle(document.body)
    .getPropertyValue("background-image")
    .replace("url(\"", "")
    .replace("\")", "");

  const backgroundInStorage = await getStorageData(BACKGROUND_KEY);

  if (currentBackgroundImage !== backgroundInStorage) {
    document.body.style.backgroundImage = `url("${backgroundInStorage}")`;
    document.body.style.transition = `background-image 1s ease`;
  }
}

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "backgroundChanged" ) {
        updateBackgroundImage();
      }
    }
  );
}, 1000)