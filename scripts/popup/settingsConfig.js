import {
  BACKGROUND_KEY,
  CARD_LINK_BG_COLOR, CARD_LINK_CREATE_COLOR, CARD_LINK_SHOW_TITLE,
  CARD_LINK_TEXT_COLOR,
  CATEGORY_COLOR,
  CLOCK_COLOR,
  CLOCK_SHADOW_COLOR,
  CLOCK_SHOW_SECONDS,
  CLOCK_STYLE,
  FONT_FAMILY_KEY,
  RSS_BG_COLOR,
  RSS_DATE_COLOR,
  RSS_TITLE_COLOR,
  RSS_URL
} from "../storage.js";

export const settingsConfig = [
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
    id: 'color-clock-shadow-color',
    label: 'Clock Shadow Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Clock Shadow Color (Ex: #ff0000)',
    storageKey: CLOCK_SHADOW_COLOR,
    messageType: 'clockShadowColorChanged'
  },
  {
    id: 'categoriesTitle',
    label: 'Categories',
    isTitle: true,
    hideLabel: true
  },
  {
    id: 'color-category',
    label: 'Category Name Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Category Name Color (Ex: #ff0000)',
    storageKey: CATEGORY_COLOR,
    messageType: 'categoryColorChanged'
  },
  {
    id: 'color-card-link-text',
    label: 'Card Link Text Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Card Link Text Color (Ex: #ff0000)',
    storageKey: CARD_LINK_TEXT_COLOR,
    messageType: 'cardLinkTextColorChanged',
  },
  {
    id: 'color-card-link-bg',
    label: 'Card Link Background Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Card Link Background Color (Ex: #ff0000)',
    storageKey: CARD_LINK_BG_COLOR,
    messageType: 'cardLinkBgColorChanged'
  },
  {
    id: 'color-card-link-create',
    label: 'Card Link Create Color',
    inputType: 'text',
    inputName: 'color',
    placeholder: 'Card Link Create Color (Ex: #ff0000)',
    storageKey: CARD_LINK_CREATE_COLOR,
    messageType: 'cardLinkCreateColorChanged',
  },
  {
    id: 'color-card-link-show-title',
    label: 'Link Card Show Title',
    inputType: 'checkbox',
    inputName: 'showTitle',
    checkboxLabel: '',
    storageKey: CARD_LINK_SHOW_TITLE,
    messageType: 'cardLinkShowTitleChanged'
  },
  {
    id: 'templatesTitle',
    label: 'Templates',
    isTitle: true,
    hideLabel: true
  },
];