import Color from "color";
import React from "react";
import type {Group, Preset, RSSFeed} from "~scripts/popup/settingsConfig";
import { useStorage } from "@plasmohq/storage/hook"
import {
  ACTIVE_GROUP,
  ACTIVE_RSS_FEED,
  BACKGROUND_KEY,
  CARD_LINK_BG_COLOR,
  CARD_LINK_TEXT_COLOR,
  CATEGORY_BG_COLOR,
  CATEGORY_TEXT_COLOR,
  CLOCK_COLOR,
  CLOCK_SHADOW_COLOR,
  CLOCK_SHOW_SECONDS,
  CLOCK_STYLE,
  CUSTOM_SEARCH_ENGINE,
  FONT_FAMILY_KEY,
  GROUPS,
  RSS_ACTIVE_COLOR,
  RSS_BG_COLOR,
  RSS_DATE_COLOR,
  RSS_ENABLE,
  RSS_FEEDS,
  RSS_TITLE_COLOR,
  SEARCH_ENGINE,
  SEARCH_ENGINE_BACKGROUND_COLOR,
  SEARCH_ENGINE_PLACEHOLDER_COLOR,
  SEARCH_ENGINE_TEXT_COLOR
} from "~scripts/storage"
import {
  CARD_LINK_BG_COLOR__DEFAULT, CARD_LINK_TEXT_COLOR__DEFAULT,
  CATEGORY_BG_COLOR__DEFAULT, CATEGORY_TEXT_COLOR__DEFAULT,
  CLOCK_COLOR__DEFAULT, CLOCK_SHADOW_COLOR__DEFAULT, FONT_FAMILY_KEY__DEFAULT, RSS_ACTIVE_COLOR__DEFAULT,
  RSS_BG_COLOR__DEFAULT, RSS_DATE_COLOR__DEFAULT, RSS_TITLE_COLOR__DEFAULT,
  SEARCH_ENGINE_BACKGROUND_COLOR__DEFAULT,
  SEARCH_ENGINE_PLACEHOLDER_COLOR__DEFAULT, SEARCH_ENGINE_TEXT_COLOR__DEFAULT} from "~scripts/defaultValues";

export const strToBool = (str: string) => str === 'true';

export const generateUuidV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getFaviconFromUrl(url: string) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getFavicon", url: url }, response => {
      resolve(response?.favicon || null);
    });
  });
}

export const darkenColor = (hexa: string, amount: number) => {
  const color = new Color(hexa);
  const alpha = color.alpha();
  const darkenedColor = color.darken(amount).rgb().object();
  return new Color({ ...darkenedColor, alpha: alpha + amount }).hexa();
};

export const rgbaString = (rgba: { r: number, g: number, b: number, a: number }) => {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

export const stringToRgba = (str: string) => {
  const col = Color(str);
  return {
    r: col.red(),
    g: col.green(),
    b: col.blue(),
    a: col.alpha(),
  }
};

export const readFileAsJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json: Preset = JSON.parse(event.target.result as string);
        resolve(json);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsText(file);
  });
};

interface Setters {
  setFontFamily: (fontFamily: string) => Promise<void>;
  setSearchEngineBackgroundColor: (searchEngineBackgroundColor: string) => Promise<void>;
  setSearchEngineTextColor: (searchEngineTextColor: string) => Promise<void>;
  setSearchEnginePlaceholderColor: (searchEnginePlaceholderColor: string) => Promise<void>;
  setBackground: (background: string) => Promise<void>;
  setClockStyle: (clockStyle: string) => Promise<void>;
  setClockShowSeconds: (clockShowSeconds: string) => Promise<void>;
  setClockColor: (clockColor: string) => Promise<void>;
  setClockShadowColor: (clockShadowColor: string) => Promise<void>;
  setRssShow: (rssShow: string) => Promise<void>;
  setRssTitleColor: (rssTitleColor: string) => Promise<void>;
  setRssDateColor: (rssDateColor: string) => Promise<void>;
  setRssBackgroundColor: (rssBackgroundColor: string) => Promise<void>;
  setRssActiveColor: (rssActiveColor: string) => Promise<void>;
  setLinkCardTextColor: (linkCardTextColor: string) => Promise<void>;
  setLinkCardBackgroundColor: (linkCardBackgroundColor: string) => Promise<void>;
  setCategoryBackgroundColor: (categoryBackgroundColor: string) => Promise<void>;
  setCategoryTextColor: (categoryTextColor: string) => Promise<void>;
}
export const applyPreset = async (preset: Preset, setters: Setters) => {
  await setters.setFontFamily(preset.fontFamily);
  await setters.setSearchEngineBackgroundColor(preset.searchEngineBackgroundColor);
  await setters.setSearchEngineTextColor(preset.searchEngineTextColor);
  await setters.setSearchEnginePlaceholderColor(preset.searchEnginePlaceholderColor);
  await setters.setBackground(preset.background);
  await setters.setClockStyle(preset.clockStyle);
  await setters.setClockShowSeconds(preset.clockShowSeconds);
  await setters.setClockColor(preset.clockColor);
  await setters.setClockShadowColor(preset.clockShadowColor);
  await setters.setRssShow(preset.rssShow);
  await setters.setRssTitleColor(preset.rssTitleColor);
  await setters.setRssDateColor(preset.rssDateColor);
  await setters.setRssBackgroundColor(preset.rssBackgroundColor);
  await setters.setRssActiveColor(preset.rssActiveColor);
  await setters.setLinkCardTextColor(preset.linkCardTextColor);
  await setters.setLinkCardBackgroundColor(preset.linkCardBackgroundColor);
  await setters.setCategoryBackgroundColor(preset.categoryBackgroundColor);
  await setters.setCategoryTextColor(preset.categoryTextColor);
};

interface Getters {
  fontFamily: string;
  searchEngineBackgroundColor: string;
  searchEngineTextColor: string;
  searchEnginePlaceholderColor: string;
  background: string;
  clockStyle: string;
  clockShowSeconds: string;
  clockColor: string;
  clockShadowColor: string;
  rssShow: string;
  rssTitleColor: string;
  rssDateColor: string;
  rssBackgroundColor: string;
  rssActiveColor: string;
  linkCardTextColor: string;
  linkCardBackgroundColor: string;
  categoryBackgroundColor: string;
  categoryTextColor: string;
}
export const buildPreset = (name: string, getters: Getters) => {
  return {
    id: generateUuidV4(),
    name,
    fontFamily: getters.fontFamily,
    searchEngineBackgroundColor: getters.searchEngineBackgroundColor,
    searchEngineTextColor: getters.searchEngineTextColor,
    searchEnginePlaceholderColor: getters.searchEnginePlaceholderColor,
    background: getters.background,
    clockStyle: getters.clockStyle,
    clockShowSeconds: getters.clockShowSeconds,
    clockColor: getters.clockColor,
    clockShadowColor: getters.clockShadowColor,
    rssShow: getters.rssShow,
    rssTitleColor: getters.rssTitleColor,
    rssDateColor: getters.rssDateColor,
    rssBackgroundColor: getters.rssBackgroundColor,
    rssActiveColor: getters.rssActiveColor,
    linkCardTextColor: getters.linkCardTextColor,
    linkCardBackgroundColor: getters.linkCardBackgroundColor,
    categoryBackgroundColor: getters.categoryBackgroundColor,
    categoryTextColor: getters.categoryTextColor
  }
}