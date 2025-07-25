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
  SEARCH_ENGINE
} from "../storage.js";

export const settingsConfig = [
  {
    id: 'search-engine',
    label: 'Search Engine',
    inputType: 'select',
    inputName: 'searchEngine',
    options: [
      {
        value: JSON.stringify({
          name: 'Google',
          link: 'https://www.google.fr/search?q=%input%',
          logo: 'https://www.google.com/favicon.ico'
        }),
        label: 'Google',
      },
      {
        value: JSON.stringify({
          name: 'DuckDuckGo',
          link: 'https://duckduckgo.com/?q=%input%',
          logo: 'https://duckduckgo.com/favicon.ico'
        }),
        label: 'DuckDuckGo',
      },
      {
        value: JSON.stringify({
          name: 'Bing',
          link: 'https://www.bing.com/search?q=%input%',
          logo: 'https://www.bing.com/favicon.ico'
        }),
        label: 'Bing',
      },
      {
        value: JSON.stringify({
          name: 'Yahoo',
          link: 'https://search.yahoo.com/search?p=%input%',
          logo: 'https://www.yahoo.com/favicon.ico'
        }),
        label: 'Yahoo',
      },
      {
        value: JSON.stringify({
          name: 'Ecosia',
          link: 'https://www.ecosia.org/search?q=%input%',
          logo: 'https://www.ecosia.org/favicon.ico'
        }),
        label: 'Ecosia',
      },
      {
        value: JSON.stringify({
          name: 'Qwant',
          link: 'https://www.qwant.com/?q=test%input%',
          logo: 'https://www.qwant.com/favicon.ico'
        }),
        label: 'Qwant',
      },
      {
        value: JSON.stringify({
          name: 'Brave Search',
          link: 'https://search.brave.com/search?q=%input%',
          logo: 'https://cdn.search.brave.com/serp/v2/_app/immutable/assets/brave-logo-dark.Bg87GL4b.svg'
        }),
        label: 'Brave Search',
      }
    ],
    storageKey: SEARCH_ENGINE,
    messageType: 'searchEngineChanged'
  },
  {
    id: 'custom-search-engine',
    label: 'Custom Search Engine',
    inputType: 'text',
    inputName: 'custom-search-engine',
    placeholder: '{"name": "","link": "","logo": ""}',
    value: '{"name": "","link": "","logo": ""}',
    storageKey: SEARCH_ENGINE,
    messageType: 'categoryColorChanged',
    extraHtml: `<span>Update the json object with "name", "link" and "logo". For the link, use %input% placeholder, this will be replaced by your input. Use this at your own risk.</span>`
  },
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
    id: 'rss-feeds-manager',
    label: 'RSS Feeds Manager',
    isTitle: false,
    hideLabel: false,
    hideInput: true,
    extraHtml: `
      <div class="rss-feeds-manager">
        <h3>Manage RSS Feeds</h3>
        <div class="rss-feeds-list" id="rss-feeds-list">
          <p class="no-feeds-message">No feeds added yet.</p>
        </div>
        <div class="add-feed-form">
          <input type="text" id="new-feed-name" placeholder="Feed Name" />
          <input type="text" id="new-feed-url" placeholder="Feed URL" />
          <button type="button" id="add-feed-btn">Add Feed</button>
        </div>
      </div>
    `
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