// font.js - Font manager

import {ACCENT_COLOR, FONT_FAMILY_KEY, getStorageData, MAIN_COLOR} from "./storage.js";

export async function setMainColor(color) {
  document.body.style.setProperty("--main-color", color);
}
export async function setAccentColor(color) {
  document.body.style.setProperty("--accent-color", color);
}

export async function updateMainColors() {
  let mainColor = await getStorageData(MAIN_COLOR);
  if (!mainColor || Object.keys(mainColor).length === 0) {
    mainColor = '#fff';
  }
  await setMainColor(mainColor);
}
export async function updateAccentColors() {
  let accentColor = await getStorageData(ACCENT_COLOR);
  if (!accentColor || Object.keys(accentColor).length === 0) {
    accentColor = '#000';
  }
  await setAccentColor(accentColor);
}

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "mainColorChanged" ) {
        updateMainColors();
      }
    }
  );
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "accentColorChanged" ) {
        updateAccentColors();
      }
    }
  );
}, 1000)