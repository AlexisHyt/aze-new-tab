// clock1.js - Clock version 1

import { CLOCK_SHOW_SECONDS, getStorageData } from "./storage.js";

/**
 * Update the clock display
 */
export async function updateClock() {
  const showSeconds = await getStorageData(CLOCK_SHOW_SECONDS);

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const element = document.getElementById("time");
  if (element) {
    if (showSeconds && typeof showSeconds !== 'object') {
      element.textContent = `${hours}:${minutes}:${seconds}`;
    } else {
      element.textContent = `${hours}:${minutes}`;
    }
  }
}

/**
 * Initialize clock with periodic updates
 */
export function initClock() {
  // Initial update
  updateClock();

  // Set interval for updates
  setInterval(updateClock, 100);
}