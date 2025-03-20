// font.js - Font manager

import {FONT_FAMILY_KEY, getStorageData} from "./storage.js";

/**
 * Update font
 * @returns {Promise<void>}
 */
export async function updateFont() {
  const fontName = await getStorageData(FONT_FAMILY_KEY);
  if (fontName) {
    // Fetch font from google font
    WebFont.load({
      google: {
        families: [fontName]
      }
    });

    // Update font
    document.body.style.fontFamily = fontName;
    document.querySelector('#search').style.fontFamily = fontName;
  }
}

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "fontChanged" ) {
        updateFont();
      }
    }
  );
}, 1000)