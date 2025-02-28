// Process imported themes data (common function for both text and file imports)
import { populateThemesDropdown } from "./generate-html.js";
import {
  getStorageData,
  getThemeSpecificStorageData,
  setStorageData,
  THEMES_KEY
} from "../storage.js";
import { settingsConfig } from "./settingsConfig.js";
import { readFileAsJson, sendMessageToActiveTab, showNotification } from "./helpers.js";

const processImportedTheme = async (importedObj, parentElement) => {
  // Validate the imported data has the expected structure
  if (!importedObj.name || !importedObj.settings || typeof importedObj.settings !== 'object') {
    throw new Error('Invalid theme format');
  }

  const themeName = importedObj.name;
  const themeSettings = importedObj.settings;

  // Get existing themes
  const existingThemes = await getStorageData(THEMES_KEY) || {};

  // Add the imported theme
  existingThemes[themeName] = themeSettings;

  // Save back to storage
  await setStorageData(existingThemes, THEMES_KEY);

  // Update dropdown
  await populateThemesDropdown();

  showNotification(`Successfully imported theme "${themeName}".`, parentElement);

  return themeName;
};
// Setup handlers for theme functionality
export const setupThemeHandlers = () => {
  // Load themes into dropdown
  populateThemesDropdown();

  // Save theme handler
  const saveForm = document.getElementById('form-save-theme');
  if (saveForm) {
    saveForm.onsubmit = async (e) => {
      e.preventDefault();

      const themeNameInput = document.getElementById('theme-name');
      const themeName = themeNameInput.value.trim();

      if (!themeName) {
        return;
      }

      // Get all current settings
      const allSettings = {};
      const currentSettings = await getThemeSpecificStorageData();

      // Only include settings defined in our config
      Object.entries(currentSettings).forEach(([key, value]) => {
        allSettings[key] = value;
      });

      // Get existing themes or create new object
      const themes = await getStorageData(THEMES_KEY) || {};

      // Add/update the theme
      themes[themeName] = allSettings;

      // Save themes back to storage
      await setStorageData(themes, THEMES_KEY);

      // Reset input and update dropdown
      themeNameInput.value = '';
      await populateThemesDropdown();

      showNotification(`Theme ${themeName} has been saved.`, saveForm.parentElement);
    };
  }

  // Load theme handler
  const loadForm = document.getElementById('form-load-theme');
  if (loadForm) {
    loadForm.onsubmit = async (e) => {
      e.preventDefault();

      const selectElement = document.getElementById('theme-select');
      const selectedTheme = selectElement.value;

      if (!selectedTheme) {
        showNotification('Please select a theme to load.', loadForm.parentElement, true);
        return;
      }

      // Get themes from storage
      const themes = await getStorageData(THEMES_KEY) || {};
      const theme = themes[selectedTheme];

      if (!theme) {
        showNotification('The selected theme could not be found.', loadForm.parentElement, true);
        return;
      }

      // Apply all settings from the theme
      const messageTypes = [];
      for (const [key, value] of Object.entries(theme)) {
        await setStorageData(value, key);

        // Find which message to send for this key
        const settingConfig = settingsConfig.find(s => s.storageKey === key);
        if (settingConfig) {
          messageTypes.push(settingConfig.messageType);
        }
      }

      // Refresh all input values
      settingsConfig.forEach(setting => {
        const input = document.getElementById(`form-${setting.id}--${setting.inputName}`);
        if (input && theme[setting.storageKey] !== undefined) {
          if (setting.inputType === 'checkbox') {
            input.checked = theme[setting.storageKey] === true || theme[setting.storageKey] === 'true';
          } else {
            input.value = theme[setting.storageKey];
          }
        }
      });

      // Send messages to update the tab
      messageTypes.forEach(message => {
        sendMessageToActiveTab(message);
      });

      selectElement.value = '';
      showNotification(`Theme ${selectedTheme} has been loaded.`, loadForm.parentElement);
    };
  }

  // Delete theme handler
  const deleteButton = document.getElementById('delete-theme');
  if (deleteButton) {
    deleteButton.onclick = async () => {
      const selectElement = document.getElementById('theme-select');
      const selectedTheme = selectElement.value;

      if (!selectedTheme) {
        showNotification('Please select a theme to delete.', deleteButton.parentElement.parentElement, true);
        return;
      }

      // Get themes from storage
      const themes = await getStorageData(THEMES_KEY) || {};

      // Delete the selected theme
      delete themes[selectedTheme];

      // Save themes back to storage
      await setStorageData(themes, THEMES_KEY);

      // Update dropdown
      await populateThemesDropdown();

      // Reset selection
      selectElement.selectedIndex = 0;

      showNotification(`Theme ${selectedTheme} has been deleted.`, deleteButton.parentElement.parentElement);
    };
  }

  // Export single theme handler
  const exportButton = document.getElementById('export-theme');
  if (exportButton) {
    exportButton.onclick = async () => {
      const selectElement = document.getElementById('theme-select');
      const selectedTheme = selectElement.value;

      if (!selectedTheme) {
        showNotification('Please select a theme to export.', exportButton.parentElement.parentElement, true);
        return;
      }

      // Get themes from storage
      const themes = await getStorageData(THEMES_KEY) || {};
      const theme = themes[selectedTheme];

      if (!theme) {
        showNotification('The selected theme could not be found.', exportButton.parentElement.parentElement, true);
        return;
      }

      // Create export object with just the selected theme
      const exportObj = {
        name: selectedTheme,
        settings: theme
      };

      // Convert to JSON string
      const themeJson = JSON.stringify(exportObj, null, 2);

      // Create a temporary element for copying
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = themeJson;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();

      try {
        // Try to copy to clipboard
        document.execCommand('copy');
        showNotification(`Theme "${selectedTheme}" copied to clipboard!`, exportButton.parentElement.parentElement);

        // Also offer download
        const blob = new Blob([themeJson], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedTheme.replace(/\s+/g, '-').toLowerCase()}.json`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        setTimeout(() => {
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 0);
      } catch (err) {
        showNotification('Failed to copy to clipboard. Try the download option.', exportButton.parentElement.parentElement, true);
      } finally {
        document.body.removeChild(tempTextarea);
      }
    };
  }

  // Handle file selection for import
  const importFileInput = document.getElementById('import-theme-file');
  if (importFileInput) {
    importFileInput.onchange = (e) => {
      if (e.target.files.length > 0) {
        const importTextarea = document.getElementById('import-theme-data');
        // Clear the textarea as we'll be using the file instead
        importTextarea.value = '';
        importTextarea.placeholder = `Selected file: ${e.target.files[0].name}`;
      }
    };
  }

  // Import theme handler (handles both text input and file input)
  const importForm = document.getElementById('import-theme-form');
  if (importForm) {
    importForm.onsubmit = async (e) => {
      e.preventDefault();

      const importTextarea = document.getElementById('import-theme-data');
      const importFileInput = document.getElementById('import-theme-file');

      try {
        let importedObj;

        // Check if a file is selected
        if (importFileInput.files.length > 0) {
          // Process the file
          importedObj = await readFileAsJson(importFileInput.files[0]);
        } else {
          // Process the textarea input
          const importData = importTextarea.value.trim();
          if (!importData) {
            showNotification('Please paste theme data or select a file to import.', importForm.parentElement, true);
            return;
          }

          importedObj = JSON.parse(importData);
        }

        // Process the imported data (common for both file and text)
        const themeName = await processImportedTheme(importedObj, importForm.parentElement);

        // Reset inputs
        importTextarea.value = '';
        importTextarea.placeholder = 'Paste theme JSON data here';
        importFileInput.value = '';

      } catch (err) {
        showNotification(`Failed to import theme: ${err.message}`, importForm.parentElement, true);
        console.error('Import error:', err);
      }
    };
  }
};