// clock.js - Clock functionality

import { CLOCK_STYLE, getStorageData } from "./storage.js";
import { initClock as initClock1 } from "./clock1.js";
import { initClock as initClock2 } from "./clock2.js";

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
      if( request.message === "clockStyleChanged" ) {
        window.location.reload();
      }
    }
  );
}, 1000)

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clockShowSecondsChanged" ) {
        window.location.reload();
      }
    }
  );
}, 1000)