// Setup form handlers for all settings
import { settingsConfig } from "./settingsConfig.js";
import { getStorageData, setStorageData } from "../storage.js";
import { sendMessageToActiveTab } from "./helpers.js";
import { setupPresetHandlers } from "./presets.js";

export const setupFormHandlers = () => {
  settingsConfig.forEach(setting => {
    if (!setting.isTitle) {
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
    }
  });

  // Setup preset handlers
  setupPresetHandlers();
};