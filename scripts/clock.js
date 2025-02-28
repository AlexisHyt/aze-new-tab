// clock.js - Clock functionality

import { CLOCK_COLOR, CLOCK_SHADOW_COLOR, CLOCK_STYLE, getStorageData } from "./storage.js";
import { initClock as initClock1 } from "./clock1.js";
import { initClock as initClock2 } from "./clock2.js";

export async function updateClockColor() {
  const color = await getStorageData(CLOCK_COLOR);
  if (color && typeof color === "string") {
    document.body.style.setProperty("--clock-color", color);
  } else {
    document.body.style.setProperty("--clock-color", "#fff");
  }
}

export async function updateClockShadowColor() {
  const color = await getStorageData(CLOCK_SHADOW_COLOR);
  if (color && typeof color === "string") {
    document.body.style.setProperty("--clock-shadow-color", color);
  } else {
    document.body.style.setProperty("--clock-shadow-color", "#fff");
  }
}

export async function updateMainClock() {
  const style = await getStorageData(CLOCK_STYLE);

  switch (style) {
    case 'flip':
      initClock2();
      break;
    case 'default':
    default:
      initClock1();
      break;
  }
}

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch (request.message) {
        case 'clockStyleChanged':
        case 'clockShowSecondsChanged':
          window.location.reload();
          break;
        case 'clockColorChanged':
          updateClockColor()
        case 'clockShadowColorChanged':
          updateClockShadowColor()
      }
      if( request.message === "clockStyleChanged" ) {
        window.location.reload();
      }
    }
  );
}, 1000)