// Generate the HTML for the settings forms
import { settingsConfig } from "./settingsConfig.js";
import { getStorageData, PRESETS_KEY, THEMES_KEY } from "../storage.js";

export const generateSettingsHTML = () => {
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
      } else {
        const form = document.createElement('form');
        form.id = `form-${setting.id}`;
        form.classList.add('form-options-group');

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

  // Add presets section
  createPresetsSection(container);
  createThemesSection(container);
};
// Create the presets UI section
const createPresetsSection = (container) => {
  const presetsDiv = document.createElement('div');
  presetsDiv.className = 'settings-group presets-group';

  // Add header
  const presetsLabel = document.createElement('label');
  presetsLabel.textContent = 'Presets:';
  presetsDiv.appendChild(presetsLabel);
  const presetsSummary = document.createElement('span');
  presetsSummary.textContent = '(takes font, background, colors, rrs url, links and clock style)';
  presetsDiv.appendChild(presetsSummary);

  // Create save preset form
  const saveForm = document.createElement('form');
  saveForm.id = 'form-save-preset';
  saveForm.className = 'preset-form';

  const saveInput = document.createElement('input');
  saveInput.type = 'text';
  saveInput.id = 'preset-name';
  saveInput.placeholder = 'Preset name';

  const saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.textContent = 'Save Preset';

  saveForm.appendChild(saveInput);
  saveForm.appendChild(saveButton);
  presetsDiv.appendChild(saveForm);

  // Create load preset form
  const loadForm = document.createElement('form');
  loadForm.id = 'form-load-preset';
  loadForm.className = 'preset-form';

  const selectPreset = document.createElement('select');
  selectPreset.id = 'preset-select';
  selectPreset.name = 'preset';

  // We'll populate this with options later
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a preset';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectPreset.appendChild(defaultOption);

  const loadButton = document.createElement('button');
  loadButton.type = 'submit';
  loadButton.textContent = 'Load';

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.id = 'delete-preset';
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-button';

  // Export button
  const exportButton = document.createElement('button');
  exportButton.type = 'button';
  exportButton.id = 'export-preset';
  exportButton.textContent = 'Export';
  exportButton.className = 'export-button';

  loadForm.appendChild(selectPreset);
  loadForm.appendChild(loadButton);
  loadForm.appendChild(deleteButton);
  loadForm.appendChild(exportButton);
  presetsDiv.appendChild(loadForm);

  // Create import preset section
  const importForm = document.createElement('form');
  importForm.id = 'import-preset-form';
  importForm.className = 'preset-form import-form';

  const importTextarea = document.createElement('textarea');
  importTextarea.id = 'import-preset-data';
  importTextarea.placeholder = 'Paste preset JSON data here';
  importTextarea.rows = 2;
  importTextarea.className = 'import-textarea';

  // Create file import input
  const importFileWrapper = document.createElement('div');
  importFileWrapper.className = 'file-import-wrapper';

  const importFileLabel = document.createElement('label');
  importFileLabel.htmlFor = 'import-preset-file';
  importFileLabel.textContent = 'Or select a JSON file:';
  importFileLabel.className = 'file-import-label';

  const importFile = document.createElement('input');
  importFile.type = 'file';
  importFile.id = 'import-preset-file';
  importFile.accept = '.json';
  importFile.className = 'file-import';

  importFileWrapper.appendChild(importFileLabel);
  importFileWrapper.appendChild(importFile);

  const importButton = document.createElement('button');
  importButton.type = 'submit';
  importButton.textContent = 'Import Preset';
  importButton.className = 'import-button';

  importForm.appendChild(importTextarea);
  importForm.appendChild(importFileWrapper);
  importForm.appendChild(importButton);
  presetsDiv.appendChild(importForm);

  container.appendChild(presetsDiv);
};
// Populate the preset dropdown
export const populatePresetDropdown = async () => {
  const selectElement = document.getElementById('preset-select');
  if (!selectElement) return;

  // Clear existing options (except the default)
  while (selectElement.options.length > 1) {
    selectElement.remove(1);
  }

  // Get presets from storage
  const presets = await getStorageData(PRESETS_KEY) || {};

  // Add options for each preset
  Object.keys(presets).forEach(presetName => {
    const option = document.createElement('option');
    option.value = presetName;
    option.textContent = presetName;
    selectElement.appendChild(option);
  });
};

// Create the themes UI section
const createThemesSection = (container) => {
  const themesDiv = document.createElement('div');
  themesDiv.className = 'settings-group themes-group';

  // Add header
  const themesLabel = document.createElement('label');
  themesLabel.textContent = 'Themes:';
  themesDiv.appendChild(themesLabel);
  const themesSummary = document.createElement('span');
  themesSummary.textContent = '(takes only font, background and colors)';
  themesDiv.appendChild(themesSummary);

  // Create save preset form
  const saveForm = document.createElement('form');
  saveForm.id = 'form-save-theme';
  saveForm.className = 'theme-form';

  const saveInput = document.createElement('input');
  saveInput.type = 'text';
  saveInput.id = 'theme-name';
  saveInput.placeholder = 'Theme name';

  const saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.textContent = 'Save Theme';

  saveForm.appendChild(saveInput);
  saveForm.appendChild(saveButton);
  themesDiv.appendChild(saveForm);

  // Create load preset form
  const loadForm = document.createElement('form');
  loadForm.id = 'form-load-theme';
  loadForm.className = 'theme-form';

  const selectTheme = document.createElement('select');
  selectTheme.id = 'theme-select';
  selectTheme.name = 'theme';

  // We'll populate this with options later
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a theme';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectTheme.appendChild(defaultOption);

  const loadButton = document.createElement('button');
  loadButton.type = 'submit';
  loadButton.textContent = 'Load';

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.id = 'delete-theme';
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-button';

  // Export button
  const exportButton = document.createElement('button');
  exportButton.type = 'button';
  exportButton.id = 'export-theme';
  exportButton.textContent = 'Export';
  exportButton.className = 'export-button';

  loadForm.appendChild(selectTheme);
  loadForm.appendChild(loadButton);
  loadForm.appendChild(deleteButton);
  loadForm.appendChild(exportButton);
  themesDiv.appendChild(loadForm);

  // Create import preset section
  const importForm = document.createElement('form');
  importForm.id = 'import-theme-form';
  importForm.className = 'theme-form import-form';

  const importTextarea = document.createElement('textarea');
  importTextarea.id = 'import-theme-data';
  importTextarea.placeholder = 'Paste theme JSON data here';
  importTextarea.rows = 2;
  importTextarea.className = 'import-textarea';

  // Create file import input
  const importFileWrapper = document.createElement('div');
  importFileWrapper.className = 'file-import-wrapper';

  const importFileLabel = document.createElement('label');
  importFileLabel.htmlFor = 'import-theme-file';
  importFileLabel.textContent = 'Or select a JSON file:';
  importFileLabel.className = 'file-import-label';

  const importFile = document.createElement('input');
  importFile.type = 'file';
  importFile.id = 'import-theme-file';
  importFile.accept = '.json';
  importFile.className = 'file-import';

  importFileWrapper.appendChild(importFileLabel);
  importFileWrapper.appendChild(importFile);

  const importButton = document.createElement('button');
  importButton.type = 'submit';
  importButton.textContent = 'Import Theme';
  importButton.className = 'import-button';

  importForm.appendChild(importTextarea);
  importForm.appendChild(importFileWrapper);
  importForm.appendChild(importButton);
  themesDiv.appendChild(importForm);

  container.appendChild(themesDiv);
};
// Populate the preset dropdown
export const populateThemesDropdown = async () => {
  const selectElement = document.getElementById('theme-select');
  if (!selectElement) return;

  // Clear existing options (except the default)
  while (selectElement.options.length > 1) {
    selectElement.remove(1);
  }

  // Get themes from storage
  const themes = await getStorageData(THEMES_KEY) || {};

  // Add options for each preset
  Object.keys(themes).forEach(presetName => {
    const option = document.createElement('option');
    option.value = presetName;
    option.textContent = presetName;
    selectElement.appendChild(option);
  });
};

// Add CSS styles for the file import
export const addFileImportStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .file-import-wrapper {
      margin: 10px 0;
    }
    
    .file-import-label {
      display: block;
      margin-bottom: 5px;
    }
    
    .file-import {
      margin-bottom: 10px;
      width: 100%;
    }
  `;
  document.head.appendChild(style);
};