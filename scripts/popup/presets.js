// Process imported preset data (common function for both text and file imports)
import { populatePresetDropdown } from "./generate-html.js";
import { getPresetsSpecificStorageData, getStorageData, PRESETS_KEY, setStorageData } from "../storage.js";
import { settingsConfig } from "./settingsConfig.js";
import { readFileAsJson, sendMessageToActiveTab, showNotification } from "./helpers.js";

const processImportedPreset = async (importedObj, parentElement) => {
  // Validate the imported data has the expected structure
  if (!importedObj.name || !importedObj.settings || typeof importedObj.settings !== 'object') {
    throw new Error('Invalid preset format');
  }

  const presetName = importedObj.name;
  const presetSettings = importedObj.settings;

  // Get existing presets
  const existingPresets = await getStorageData(PRESETS_KEY) || {};

  // Add the imported preset
  existingPresets[presetName] = presetSettings;

  // Save back to storage
  await setStorageData(existingPresets, PRESETS_KEY);

  // Update dropdown
  await populatePresetDropdown();

  showNotification(`Successfully imported preset "${presetName}".`, parentElement);

  return presetName;
};
// Setup handlers for preset functionality
export const setupPresetHandlers = () => {
  // Load presets into dropdown
  populatePresetDropdown();

  // Save preset handler
  const saveForm = document.getElementById('form-save-preset');
  if (saveForm) {
    saveForm.onsubmit = async (e) => {
      e.preventDefault();

      const presetNameInput = document.getElementById('preset-name');
      const presetName = presetNameInput.value.trim();

      if (!presetName) {
        return;
      }

      // Get all current settings
      const allSettings = {};
      const currentSettings = await getPresetsSpecificStorageData();

      console.log("currentSettings")
      console.log(currentSettings)

      // Only include settings defined in our config
      Object.entries(currentSettings).forEach(([key, value]) => {
        allSettings[key] = value;
      });

      console.log("allSettings")
      console.log(allSettings)

      // Get existing presets or create new object
      const presets = await getStorageData(PRESETS_KEY) || {};

      // Add/update the preset
      presets[presetName] = allSettings;

      // Save presets back to storage
      await setStorageData(presets, PRESETS_KEY);

      // Reset input and update dropdown
      presetNameInput.value = '';
      await populatePresetDropdown();

      showNotification(`Preset ${presetName} has been saved.`, saveForm.parentElement);
    };
  }

  // Load preset handler
  const loadForm = document.getElementById('form-load-preset');
  if (loadForm) {
    loadForm.onsubmit = async (e) => {
      e.preventDefault();

      const selectElement = document.getElementById('preset-select');
      const selectedPreset = selectElement.value;

      if (!selectedPreset) {
        showNotification('Please select a preset to load.', loadForm.parentElement, true);
        return;
      }

      // Get presets from storage
      const presets = await getStorageData(PRESETS_KEY) || {};
      const preset = presets[selectedPreset];

      if (!preset) {
        showNotification('The selected preset could not be found.', loadForm.parentElement, true);
        return;
      }

      // Apply all settings from the preset
      const messageTypes = [];
      for (const [key, value] of Object.entries(preset)) {
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
        if (input && preset[setting.storageKey] !== undefined) {
          if (setting.inputType === 'checkbox') {
            input.checked = preset[setting.storageKey] === true || preset[setting.storageKey] === 'true';
          } else {
            input.value = preset[setting.storageKey];
          }
        }
      });

      // Send messages to update the tab
      messageTypes.forEach(message => {
        sendMessageToActiveTab(message);
      });

      selectElement.value = '';
      showNotification(`Preset ${selectedPreset} has been loaded.`, loadForm.parentElement);
    };
  }

  // Delete preset handler
  const deleteButton = document.getElementById('delete-preset');
  if (deleteButton) {
    deleteButton.onclick = async () => {
      const selectElement = document.getElementById('preset-select');
      const selectedPreset = selectElement.value;

      if (!selectedPreset) {
        showNotification('Please select a preset to delete.', deleteButton.parentElement.parentElement, true);
        return;
      }

      // Get presets from storage
      const presets = await getStorageData(PRESETS_KEY) || {};

      // Delete the selected preset
      delete presets[selectedPreset];

      // Save presets back to storage
      await setStorageData(presets, PRESETS_KEY);

      // Update dropdown
      await populatePresetDropdown();

      // Reset selection
      selectElement.selectedIndex = 0;

      showNotification(`Preset ${selectedPreset} has been deleted.`, deleteButton.parentElement.parentElement);
    };
  }

  // Export single preset handler
  const exportButton = document.getElementById('export-preset');
  if (exportButton) {
    exportButton.onclick = async () => {
      const selectElement = document.getElementById('preset-select');
      const selectedPreset = selectElement.value;

      if (!selectedPreset) {
        showNotification('Please select a preset to export.', exportButton.parentElement.parentElement, true);
        return;
      }

      // Get presets from storage
      const presets = await getStorageData(PRESETS_KEY) || {};
      const preset = presets[selectedPreset];

      if (!preset) {
        showNotification('The selected preset could not be found.', exportButton.parentElement.parentElement, true);
        return;
      }

      // Create export object with just the selected preset
      const exportObj = {
        name: selectedPreset,
        settings: preset
      };

      // Convert to JSON string
      const presetJson = JSON.stringify(exportObj, null, 2);

      // Create a temporary element for copying
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = presetJson;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();

      try {
        // Try to copy to clipboard
        document.execCommand('copy');
        showNotification(`Preset "${selectedPreset}" copied to clipboard!`, exportButton.parentElement.parentElement);

        // Also offer download
        const blob = new Blob([presetJson], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedPreset.replace(/\s+/g, '-').toLowerCase()}.json`;
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
  const importFileInput = document.getElementById('import-preset-file');
  if (importFileInput) {
    importFileInput.onchange = (e) => {
      if (e.target.files.length > 0) {
        const importTextarea = document.getElementById('import-preset-data');
        // Clear the textarea as we'll be using the file instead
        importTextarea.value = '';
        importTextarea.placeholder = `Selected file: ${e.target.files[0].name}`;
      }
    };
  }

  // Import preset handler (handles both text input and file input)
  const importForm = document.getElementById('import-preset-form');
  if (importForm) {
    importForm.onsubmit = async (e) => {
      e.preventDefault();

      const importTextarea = document.getElementById('import-preset-data');
      const importFileInput = document.getElementById('import-preset-file');

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
            showNotification('Please paste preset data or select a file to import.', importForm.parentElement, true);
            return;
          }

          importedObj = JSON.parse(importData);
        }

        // Process the imported data (common for both file and text)
        const presetName = await processImportedPreset(importedObj, importForm.parentElement);

        // Reset inputs
        importTextarea.value = '';
        importTextarea.placeholder = 'Paste preset JSON data here';
        importFileInput.value = '';

      } catch (err) {
        showNotification(`Failed to import preset: ${err.message}`, importForm.parentElement, true);
        console.error('Import error:', err);
      }
    };
  }
};