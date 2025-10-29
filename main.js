import { initializeRSSFeeds } from './scripts/rss-feed.js';
import { getCategories } from './scripts/category-manager.js';
import { updateBackgroundImage } from "./scripts/background-image.js";
import { updateFont } from "./scripts/font.js";
import { updateColor } from "./scripts/colors.js";
import { updateClockColor, updateClockShadowColor, updateMainClock } from "./scripts/clock.js";
import {
  CARD_LINK_BG_COLOR, CARD_LINK_CREATE_COLOR,
  CARD_LINK_TEXT_COLOR,
  CATEGORY_COLOR,
  RSS_BG_COLOR, RSS_DATE_COLOR, RSS_TITLE_COLOR,
  GROUPS_KEY, ACTIVE_GROUP_KEY,
  getStorageData, setStorageData
} from "./scripts/storage.js";
import { setupEnterListener, updateSearchInput } from "./scripts/ui-components.js";
import { migrateGroupsFromLegacy } from './scripts/storage.js';

async function populateGroupSelect() {
  const select = document.getElementById('group-select');
  const trigger = document.getElementById('group-select-trigger');
  const dropdown = document.getElementById('group-dropdown');
  if (!select || !trigger || !dropdown) return;

  // Clear native select
  while (select.firstChild) select.removeChild(select.firstChild);
  // Clear custom dropdown
  dropdown.innerHTML = '';

  const groups = await getStorageData(GROUPS_KEY) || {};
  const active = await getStorageData(ACTIVE_GROUP_KEY);
  const keys = Object.keys(groups);

  if (keys.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'No groups';
    select.appendChild(opt);
    select.disabled = true;

    trigger.textContent = 'No groups';
    trigger.disabled = true;
    dropdown.classList.remove('open');
    return;
  }

  // Enable controls
  select.disabled = false;
  trigger.disabled = false;

  // Populate native select (fallback)
  keys.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    if (name === active) opt.selected = true;
    select.appendChild(opt);
  });

  // Populate custom dropdown
  keys.forEach(name => {
    const item = document.createElement('div');
    item.className = 'group-option';
    item.setAttribute('role', 'option');
    item.setAttribute('tabindex', '0');
    item.dataset.value = name;
    if (name === active) item.setAttribute('aria-selected', 'true');
    item.innerHTML = `<span>${name}</span>${name === active ? '<span class="badge">active</span>' : ''}`;

    item.addEventListener('click', async () => {
      await setStorageData(name, ACTIVE_GROUP_KEY);
      closeGroupDropdown();
      await getCategories();
    });
    item.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        await setStorageData(name, ACTIVE_GROUP_KEY);
        closeGroupDropdown();
        await getCategories();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusNextGroupOption(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusNextGroupOption(-1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeGroupDropdown(true);
      }
    });

    dropdown.appendChild(item);
  });

  // Update trigger label
  if (active && keys.includes(active)) {
    trigger.textContent = active;
  } else {
    trigger.textContent = 'Select group';
  }

  // Native select change (still supported)
  select.onchange = async (e) => {
    const newActive = e.target.value;
    await setStorageData(newActive, ACTIVE_GROUP_KEY);
    await getCategories();
  };
}

// Dropdown helpers
function openGroupDropdown() {
  const dropdown = document.getElementById('group-dropdown');
  const trigger = document.getElementById('group-select-trigger');
  if (!dropdown || !trigger || trigger.disabled) return;
  dropdown.classList.add('open');
  trigger.setAttribute('aria-expanded', 'true');
}
function closeGroupDropdown(focusTrigger = false) {
  const dropdown = document.getElementById('group-dropdown');
  const trigger = document.getElementById('group-select-trigger');
  if (!dropdown || !trigger) return;
  dropdown.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
  if (focusTrigger) trigger.focus();
}
function isDropdownOpen() {
  const dropdown = document.getElementById('group-dropdown');
  return dropdown && dropdown.classList.contains('open');
}
function getGroupOptions() {
  const dropdown = document.getElementById('group-dropdown');
  return dropdown ? Array.from(dropdown.querySelectorAll('.group-option')) : [];
}
function focusNextGroupOption(direction) {
  const options = getGroupOptions();
  if (options.length === 0) return;
  const index = options.indexOf(document.activeElement);
  let next = index + direction;
  if (next < 0) next = options.length - 1;
  if (next >= options.length) next = 0;
  options[next].focus();
}
function focusFirstGroupOption() {
  const options = getGroupOptions();
  if (options.length > 0) options[0].focus();
}

function setupGroupDropdownInteractions() {
  const trigger = document.getElementById('group-select-trigger');
  const dropdown = document.getElementById('group-dropdown');
  if (!trigger || !dropdown) return;

  // Trigger click toggles dropdown
  trigger.addEventListener('click', () => {
    if (isDropdownOpen()) {
      closeGroupDropdown();
    } else {
      openGroupDropdown();
      // focus the selected option or first
      const selected = dropdown.querySelector('.group-option[aria-selected="true"]');
      (selected || dropdown.querySelector('.group-option'))?.focus();
    }
  });

  // Keyboard on trigger
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGroupDropdown();
      focusFirstGroupOption();
    }
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!isDropdownOpen()) return;
    const within = e.target === trigger || dropdown.contains(e.target);
    if (!within) closeGroupDropdown();
  });

  // Escape to close when open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isDropdownOpen()) {
      e.preventDefault();
      closeGroupDropdown(true);
    }
  });
}

/**
 * Initialize the extension
 */
async function init() {
  // Setup clock
  updateMainClock();
  updateClockColor();
  updateClockShadowColor();

  // Update the search input
  updateSearchInput();
  setupEnterListener();

  // Update background image
  updateBackgroundImage();

  // Update Font
  updateFont();

  // Update Colors
  updateColor(CATEGORY_COLOR, "--category-color");
  updateColor(CARD_LINK_BG_COLOR, "--card-link-bg-color");
  updateColor(CARD_LINK_CREATE_COLOR, "--card-link-create-color");
  updateColor(CARD_LINK_TEXT_COLOR, "--card-link-text-color", "#000");
  updateColor(RSS_BG_COLOR, "--rss-bg-color");
  updateColor(RSS_TITLE_COLOR, "--rss-title-color", "#000");
  updateColor(RSS_DATE_COLOR, "--rss-date-color", "#000");

  // Load RSS feed
  // fetchRSSFeed("https://dev.to/feed");
  initializeRSSFeeds();

  // Migration to groups if needed
  await migrateGroupsFromLegacy();

  // Populate group selector
  await populateGroupSelect();
  // Setup custom dropdown interactions
  setupGroupDropdownInteractions();

  // Listen for changes coming from popup or other tabs to keep selector in sync
  try {
    chrome.runtime.onMessage.addListener((request) => {
      if (request && request.message === 'reload') {
        // Repopulate groups and reload categories
        populateGroupSelect();
        getCategories();
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'sync') return;
      const groupsChanged = Object.prototype.hasOwnProperty.call(changes, GROUPS_KEY);
      const activeChanged = Object.prototype.hasOwnProperty.call(changes, ACTIVE_GROUP_KEY);
      if (groupsChanged || activeChanged) {
        // Update the selector options and selected value
        populateGroupSelect();
        // Only reload categories if the active group changed or if groups changed in a way that affects active selection
        if (activeChanged || groupsChanged) {
          getCategories();
        }
      }
    });
  } catch (e) {
    // Fail-safe: do nothing if listeners cannot be attached
    console.warn('Could not attach cross-context listeners', e);
  }

  // Load categories
  await getCategories();
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
  document.body.style.display = 'block';
}