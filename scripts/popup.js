import {
  ACCENT_COLOR,
  BACKGROUND_KEY,
  CLOCK_STYLE,
  FONT_FAMILY_KEY,
  MAIN_COLOR,
  RSS_URL,
  setStorageData,
  getStorageData,
  CLOCK_SHOW_SECONDS,
  CATEGORY_COLOR,
  CARD_LINK_BG_COLOR,
  CARD_LINK_TEXT_COLOR,
  RSS_BG_COLOR,
  RSS_TITLE_COLOR, RSS_DATE_COLOR, CLOCK_COLOR, CARD_LINK_SHOW_TITLE
} from "./storage.js";

/*
TODO:
Save/load presets
 */

// Enhanced configuration object that defines all settings
const settingsConfig = [
  {
    id: 'bgTitle',
    label: 'Background',
    isTitle: true,
    hideLabel: true
  },
  {
    id: 'background',
    label: 'Background Image',
    inputType: 'text',
    inputName: 'image',
    placeholder: 'Image URL',
    storageKey: BACKGROUND_KEY,
    messageType: 'backgroundChanged'
  },
  {
    id: 'fontTitle',
    label: 'Font',
    isTitle: true,
    hideLabel: true
  },
  {
    id: 'font',
    label: 'Google Font Family Name',
    inputType: 'text',
    inputName: 'name',
    placeholder: 'Google Font Family Name',
    storageKey: FONT_FAMILY_KEY,
    messageType: 'fontChanged'
  },
  {
    id: 'rssTitle',
    label: 'RSS',
    isTitle: true,
    hideLabel: true
  },
  {
    id: 'rss',
    label: 'RSS Url',
    inputType: 'text',
    inputName: 'url',
    placeholder: 'RSS Feed Url',
    storageKey: RSS_URL,
    messageType: 'rssFeedChanged',
    extraHtml: '<a href="https://github.com/plenaryapp/awesome-rss-feeds?tab=readme-ov-file" target="_blank">See here for RSS urls</a>'
  },
  {
    id: 'color-rss-bg',
    label: 'RSS Background Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'RSS Background Color (Ex: #ff0000)',
    storageKey: RSS_BG_COLOR,
    messageType: 'rssBgColorChanged',
  },
  {
    id: 'color-rss-title',
    label: 'RSS Title Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'RSS Title Color (Ex: #ff0000)',
    storageKey: RSS_TITLE_COLOR,
    messageType: 'rssTitleColorChanged',
  },
  {
    id: 'color-rss-date',
    label: 'RSS Date Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'RSS Date Color (Ex: #ff0000)',
    storageKey: RSS_DATE_COLOR,
    messageType: 'rssDateColorChanged',
  },
  {
    id: 'clockTitle',
    label: 'Clock',
    isTitle: true,
    hideLabel: true
  },
  {
    id: 'clock',
    label: 'Clock Style',
    inputType: 'select',
    inputName: 'style',
    options: [
      { value: 'default', label: 'Default' },
      { value: 'flip', label: 'Flip Digits' }
    ],
    storageKey: CLOCK_STYLE,
    messageType: 'clockStyleChanged'
  },
  {
    id: 'clock-seconds',
    label: 'Show Clock Seconds',
    inputType: 'checkbox',
    inputName: 'show',
    checkboxLabel: '',
    storageKey: CLOCK_SHOW_SECONDS,
    messageType: 'clockShowSecondsChanged'
  },
  {
    id: 'color-clock-color',
    label: 'Clock Text Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Clock Text Color (Ex: #ff0000)',
    storageKey: CLOCK_COLOR,
    messageType: 'clockColorChanged'
  },
  {
    id: 'colorTitle',
    label: 'Colors',
    isTitle: true,
    hideLabel: true
  },
  {
    id: 'color-main',
    label: 'Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Main Color (Ex: #ff0000)',
    storageKey: MAIN_COLOR,
    messageType: 'mainColorChanged'
  },
  {
    id: 'color-accent',
    label: 'Accent Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Accent Color (Ex: #ff0000)',
    storageKey: ACCENT_COLOR,
    messageType: 'accentColorChanged'
  },
  {
    id: 'color-category',
    label: 'Categories Name Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Categories Name Color (Ex: #ff0000)',
    storageKey: CATEGORY_COLOR,
    messageType: 'categoryColorChanged'
  },
  {
    id: 'color-card-link-bg',
    label: 'Link Card Background Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Link Card Background Color (Ex: #ff0000)',
    storageKey: CARD_LINK_BG_COLOR,
    messageType: 'cardLinkBgColorChanged'
  },
  {
    id: 'color-card-link-text',
    label: 'Link Card Text Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Link Card Text Color (Ex: #ff0000)',
    storageKey: CARD_LINK_TEXT_COLOR,
    messageType: 'cardLinkTextColorChanged',
  },
  {
    id: 'color-card-link-show-title',
    label: 'Link Card Show Title',
    inputType: 'text',
    inputName: 'showTitle',
    placeholder: 'Link Card Text Color (Ex: #ff0000)',
    storageKey: CARD_LINK_TEXT_COLOR,
    messageType: 'cardLinkTextColorChanged',
  },
  {
    id: 'color-card-link-show-title',
    label: 'Link Card Show Title',
    inputType: 'checkbox',
    inputName: 'showTitle',
    checkboxLabel: '',
    storageKey: CARD_LINK_SHOW_TITLE,
    messageType: 'cardLinkShowTitleChanged'
  }
];

// Function to send a message to the active tab
const sendMessageToActiveTab = (message) => {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": message});
  });
};

// Generate the HTML for the settings forms
const generateSettingsHTML = () => {
  const container = document.getElementById('settings-container');
  if (!container) return;

  // Group settings by their groupId or create individual groups
  const groups = {};
  settingsConfig.forEach(setting => {
    const groupKey = setting.groupId || `individual-${setting.id}`;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(setting);
  });

  // Generate HTML for each group
  Object.entries(groups).forEach(([groupKey, settings]) => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'settings-group';

    // Only show label for the first item in a group
    const firstItem = settings[0];
    if (!firstItem.hideLabel) {
      const label = document.createElement('label');
      label.textContent = `${firstItem.label}: `;
      groupDiv.appendChild(label);
    }

    // Add each setting form to the group
    settings.forEach(setting => {
      if (setting.isTitle) {
        const title = document.createElement('h2');
        title.textContent = setting.label;
        groupDiv.appendChild(title);
      }
      else {
        const form = document.createElement('form');
        form.id = `form-${setting.id}`;

        if (setting.inputType === 'select') {
          const select = document.createElement('select');
          select.name = setting.inputName;
          select.id = `form-${setting.id}--${setting.inputName}`;

          setting.options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option.value;
            optionEl.textContent = option.label;
            select.appendChild(optionEl);
          });

          form.appendChild(select);
        }
        else if (setting.inputType === 'checkbox') {
          const checkboxWrapper = document.createElement('div');
          checkboxWrapper.className = 'checkbox-wrapper';

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.name = setting.inputName;
          checkbox.id = `form-${setting.id}--${setting.inputName}`;

          const checkboxLabel = document.createElement('label');
          checkboxLabel.htmlFor = checkbox.id;
          checkboxLabel.textContent = setting.checkboxLabel || '';
          checkboxLabel.className = 'checkbox-label';

          checkboxWrapper.appendChild(checkbox);
          checkboxWrapper.appendChild(checkboxLabel);
          form.appendChild(checkboxWrapper);
        }
        else {
          const input = document.createElement('input');
          input.type = setting.inputType;
          input.name = setting.inputName;
          input.id = `form-${setting.id}--${setting.inputName}`;
          input.placeholder = setting.placeholder;
          form.appendChild(input);
        }

        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = 'Change';
        form.appendChild(button);

        groupDiv.appendChild(form);
      }
    });

    // Add any extra HTML
    if (firstItem.extraHtml) {
      const extraContainer = document.createElement('div');
      extraContainer.innerHTML = firstItem.extraHtml;
      groupDiv.appendChild(extraContainer);
    }

    container.appendChild(groupDiv);
  });
};

// Setup form handlers for all settings
const setupFormHandlers = () => {
  settingsConfig.forEach(setting => {
    const form = document.querySelector(`#form-${setting.id}`);
    const input = document.getElementById(`form-${setting.id}--${setting.inputName}`);

    if (!form || !input) {
      console.error(`Could not find form #form-${setting.id} or input #form-${setting.id}--${setting.inputName}`);
      return;
    }

    // Load current value from storage
    getStorageData(setting.storageKey).then(value => {
      if (value !== undefined) {
        if (setting.inputType === 'checkbox') {
          input.checked = value === 'true' || value === true;
        } else {
          if (typeof value === 'object') {
            input.value = "";
          } else {
            input.value = value;
          }
        }
      }
    });

    form.onsubmit = async (e) => {
      e.preventDefault();

      let value;
      if (setting.inputType === 'checkbox') {
        value = input.checked;
      } else {
        value = input.value.trim();
      }

      await setStorageData(value, setting.storageKey);
      sendMessageToActiveTab(setting.messageType);
    };
  });
};

// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  generateSettingsHTML();
  setupFormHandlers();
});