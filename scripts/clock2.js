// clock2.js - Clock version 2

import { CLOCK_SHOW_SECONDS, getStorageData } from "./storage.js";

/**
 * Creates the clock HTML structure with separate containers for each digit
 */
export async function setupClockDOM() {
  const container = document.getElementById("time");
  const showSeconds = await getStorageData(CLOCK_SHOW_SECONDS);
  if (!container) return;

  // Create the clock structure with digit containers
  if (showSeconds && typeof showSeconds !== 'object') {
    container.innerHTML = `
    <div class="clock-container">
      <div class="digit-group hours">
        <div class="digit hour-tens"></div>
        <div class="digit hour-ones"></div>
      </div>
      <div class="separator">:</div>
      <div class="digit-group minutes">
        <div class="digit minute-tens"></div>
        <div class="digit minute-ones"></div>
      </div>
      <div class="separator">:</div>
      <div class="digit-group seconds">
        <div class="digit second-tens"></div>
        <div class="digit second-ones"></div>
      </div>
    </div>
  `;
  } else {
    container.innerHTML = `
    <div class="clock-container">
      <div class="digit-group hours">
        <div class="digit hour-tens"></div>
        <div class="digit hour-ones"></div>
      </div>
      <div class="separator">:</div>
      <div class="digit-group minutes">
        <div class="digit minute-tens"></div>
        <div class="digit minute-ones"></div>
      </div>
    </div>
  `;
  }

  // Add required CSS
  addClockStyles();
}

/**
 * Add the required CSS for the clock animations
 */
function addClockStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .clock-container {
      display: flex;
      align-items: center;
      font-family: 'Arial', sans-serif;
      font-weight: bold;
      font-size: 8vw;
    }
    
    .digit-group {
      display: flex;
    }
    
    .digit {
      position: relative;
      width: 0.6em;
      height: 1.0em;
      overflow: hidden;
      text-align: center;
    }
    
    .digit-value {
      position: absolute;
      width: 100%;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                  opacity 0.3s ease;
    }
    
    .digit-value.entering {
      transform: translateY(-100%);
      opacity: 0;
    }
    
    .digit-value.current {
      transform: translateY(0);
      opacity: 1;
    }
    
    .digit-value.exiting {
      transform: translateY(100%);
      opacity: 0;
    }
    
    .separator {
      margin: 0 0.2em;
      animation: pulse 1s infinite alternate;
    }
    
    @keyframes pulse {
      from { opacity: 0.5; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(styleElement);
}

/**
 * Update the clock with animated digit transitions
 */
export async function updateClock() {
  const showSeconds = await getStorageData(CLOCK_SHOW_SECONDS);
  const now = new Date();

  // Format time parts with leading zeros
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const digitContainer = document.querySelector(`.time`);
  const currentTimer = digitContainer.textContent.replaceAll('\n', '').replaceAll(' ', '');

  let newTimer;
  if (showSeconds && typeof showSeconds !== 'object') {
    newTimer = hours[0] + hours[1] + ':' + minutes[0] + minutes[1] + ':' + seconds[0] + seconds[1];
  } else {
    newTimer = hours[0] + hours[1] + ':' + minutes[0] + minutes[1];
  }

  if (
    currentTimer !== newTimer
    && (
      currentTimer.length === 8
      || currentTimer.length === 5
      || currentTimer.length === 2
      || currentTimer.length === 1
    )
  ) {
    // Update each digit with animation
    updateDigit('hour-tens', hours[0]);
    updateDigit('hour-ones', hours[1]);
    updateDigit('minute-tens', minutes[0]);
    updateDigit('minute-ones', minutes[1]);

    if (showSeconds && typeof showSeconds !== 'object') {
      updateDigit('second-tens', seconds[0]);
      updateDigit('second-ones', seconds[1]);
    }
  }
}

/**
 * Update a single digit with animation
 * @param {string} digitClass - Class of the digit container
 * @param {string} newValue - New value for the digit
 */
function updateDigit(digitClass, newValue) {
  const digitContainer = document.querySelector(`.${digitClass}`);
  if (!digitContainer) return;

  // Get current digit value
  const currentElement = digitContainer.querySelector('.digit-value.current');
  const currentValue = currentElement ? currentElement.textContent : null;

  // If the value hasn't changed, do nothing
  if (currentValue === newValue) return;

  // Remove any exiting digits
  const exitingElements = digitContainer.querySelectorAll('.digit-value.exiting');
  exitingElements.forEach(el => el.remove());

  // Move current to exiting
  if (currentElement) {
    currentElement.classList.remove('current');
    currentElement.classList.add('exiting');

    // Remove after animation completes
    setTimeout(() => currentElement.remove(), 300);
  }

  // Create and add the new digit
  const newElement = document.createElement('div');
  newElement.classList.add('digit-value', 'entering');
  newElement.textContent = newValue;
  digitContainer.appendChild(newElement);

  // Trigger a reflow to ensure the entering class takes effect
  void newElement.offsetWidth;

  // Move to current position
  setTimeout(() => {
    newElement.classList.remove('entering');
    newElement.classList.add('current');
  }, 50);
}

/**
 * Initialize the animated clock
 */
export async function initClock() {
  // Set up DOM structure
  await setupClockDOM();

  // Initial update
  updateClock();

  // Set interval for updates
  setInterval(updateClock, 100);

  // Add special animation for separator
  const separators = document.querySelectorAll('.separator');
  separators.forEach(sep => {
    sep.style.animation = 'pulse 1s infinite alternate';
  });
}