// clock2.js - Clock version 2
// Design from: https://github.com/githyperplexed/clock-of-clocks

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
        <div class="digit hour-tens">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
        <div class="digit hour-ones">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
      </div>
      <div class="separator"><div class="dot"></div><div class="dot"></div></div>
      <div class="digit-group minutes">
        <div class="digit minute-tens">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
        <div class="digit minute-ones">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
      </div>
      <div class="separator"><div class="dot"></div><div class="dot"></div></div>
      <div class="digit-group seconds">
        <div class="digit second-tens">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
        <div class="digit second-ones">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
      </div>
    </div>
  `;
  } else {
    container.innerHTML = `
    <div class="clock-container">
      <div class="digit-group hours">
        <div class="digit hour-tens">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
        <div class="digit hour-ones">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
      </div>
      <div class="separator"><div class="dot"></div><div class="dot"></div></div>
      <div class="digit-group minutes">
        <div class="digit minute-tens">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
        <div class="digit minute-ones">
          ${Array.from({ length: 24 }, () => '<div class="digit-cell"><div class="hand"></div><div class="dot"></div></div>').join('')}
        </div>
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
      gap: 1rem;
    }
    
    .clock-container > .digit-group {
      display: flex;
      gap: 1rem;
    }
    
    .digit {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(6, 1fr);
      gap: 0.125rem;
    }
    
    .digit-cell {
      height: 1.5rem;
      width: 1.5rem;
      position: relative;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 1000px;
    }
    
    .digit-cell > .hand {
      width: 50%;
      height: 4px;
      background-color: rgba(255, 255, 255, 1);
      position: absolute;
      transform-origin: center left;
      top: 50%;
      left: 50%;
      translate: 0% -50%;
      rotate: 135deg;
      transition: rotate 250ms;
      border-radius: 1000px;
    }
    
    .digit-cell > .dot {
      width: 50%;
      height: 4px;
      background-color: rgba(255, 255, 255, 1);
      position: absolute;
      transform-origin: center left;
      top: 50%;
      left: 50%;
      translate: 0% -50%;
      rotate: 135deg;
      transition: rotate 250ms;
      border-radius: 1000px;
    }
    
    .separator {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 1rem;
      height: 100%;
    }
    .separator > .dot {
      width: 10px;
      height: 10px;
      border: 2px solid rgba(255, 255, 255, 1);
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
  const rotation = {
    " ": [135, 135],
    "┘": [180, 270],
    "└": [0, 270],
    "┐": [90, 180],
    "┌": [0, 90],
    "-": [0, 180],
    "|": [90, 270]
  }
  const digits = {
    "0": [
      "┌", "-", "-", "┐",
      "|", "┌", "┐", "|",
      "|", "|", "|", "|",
      "|", "|", "|", "|",
      "|", "└", "┘", "|",
      "└", "-", "-", "┘",
    ],

    "1": [
      "┌", "-", "┐", " ",
      "└", "┐", "|", " ",
      " ", "|", "|", " ",
      " ", "|", "|", " ",
      "┌", "┘", "└", "┐",
      "└", "-", "-", "┘",
    ],

    "2": [
      "┌", "-", "-", "┐",
      "└", "-", "┐", "|",
      "┌", "-", "┘", "|",
      "|", "┌", "-", "┘",
      "|", "└", "-", "┐",
      "└", "-", "-", "┘",
    ],

    "3": [
      "┌", "-", "-", "┐",
      "└", "-", "┐", "|",
      " ", "┌", "┘", "|",
      " ", "└", "┐", "|",
      "┌", "-", "┘", "|",
      "└", "-", "-", "┘",
    ],

    "4": [
      "┌", "┐", "┌", "┐",
      "|", "|", "|", "|",
      "|", "└", "┘", "|",
      "└", "-", "┐", "|",
      " ", " ", "|", "|",
      " ", " ", "└", "┘",
    ],

    "5": [
      "┌", "-", "-", "┐",
      "|", "┌", "-", "┘",
      "|", "└", "-", "┐",
      "└", "-", "┐", "|",
      "┌", "-", "┘", "|",
      "└", "-", "-", "┘",
    ],

    "6": [
      "┌", "-", "-", "┐",
      "|", "┌", "-", "┘",
      "|", "└", "-", "┐",
      "|", "┌", "┐", "|",
      "|", "└", "┘", "|",
      "└", "-", "-", "┘",
    ],

    "7": [
      "┌", "-", "-", "┐",
      "└", "-", "┐", "|",
      " ", " ", "|", "|",
      " ", " ", "|", "|",
      " ", " ", "|", "|",
      " ", " ", "└", "┘",
    ],

    "8": [
      "┌", "-", "-", "┐",
      "|", "┌", "┐", "|",
      "|", "└", "┘", "|",
      "|", "┌", "┐", "|",
      "|", "└", "┘", "|",
      "└", "-", "-", "┘",
    ],

    "9": [
      "┌", "-", "-", "┐",
      "|", "┌", "┐", "|",
      "|", "└", "┘", "|",
      "└", "-", "┐", "|",
      "┌", "-", "┘", "|",
      "└", "-", "-", "┘",
    ]
  }

  const showSeconds = await getStorageData(CLOCK_SHOW_SECONDS);
  const now = new Date();

  // Format time parts with leading zeros
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const digitContainer = document.querySelector(`.time`);

  let digitsRotations;
  if (showSeconds && typeof showSeconds !== 'object') {
    digitsRotations = {
      "hour-tens": digits[hours[0]],
      "hour-ones": digits[hours[1]],
      "minute-tens": digits[minutes[0]],
      "minute-ones": digits[minutes[1]],
      "second-tens": digits[seconds[0]],
      "second-ones": digits[seconds[1]],
    }
  } else {
    digitsRotations = {
      "hour-tens": digits[hours[0]],
      "hour-ones": digits[hours[1]],
      "minute-tens": digits[minutes[0]],
      "minute-ones": digits[minutes[1]],
    }
  }

  Object.entries(digitsRotations).forEach((key, index, digitRotations) => {
    const finalKey = key[0];
    const digitElement = digitContainer.querySelector(`.digit.${finalKey}`);
    const digitCells = digitElement.querySelectorAll('.digit-cell');

    digitCells.forEach((cell, index) => {
      const hand = cell.querySelector('.hand');
      const dot = cell.querySelector('.dot');
      const dRotation = digitRotations.filter(rot => rot[0] === finalKey)[0][1][index];

      if (dRotation) {
        hand.style.rotate = `${rotation[dRotation][0]}deg`;
        dot.style.rotate = `${rotation[dRotation][1]}deg`;
      }
    })
  })
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