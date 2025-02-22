import {
  ACCENT_COLOR,
  BACKGROUND_KEY,
  CLOCK_STYLE,
  FONT_FAMILY_KEY,
  MAIN_COLOR,
  RSS_URL,
  setStorageData,
  getStorageData, CLOCK_SHOW_SECONDS
} from "./storage.js";

// Enhanced configuration object that defines all settings
const settingsConfig = [
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
    id: 'font',
    label: 'Family Name',
    inputType: 'text',
    inputName: 'name',
    placeholder: 'Font Family Name',
    storageKey: FONT_FAMILY_KEY,
    messageType: 'fontChanged'
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
    id: 'color-main',
    label: 'Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Main Color (Ex: #ff0000)',
    storageKey: MAIN_COLOR,
    messageType: 'mainColorChanged',
    groupId: 'color-group'
  },
  {
    id: 'color-accent',
    label: 'Accent Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Accent Color (Ex: #ff0000)',
    storageKey: ACCENT_COLOR,
    messageType: 'accentColorChanged',
    groupId: 'color-group',
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
      } else if (setting.inputType === 'checkbox') {
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
      } else {
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
          input.value = value;
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