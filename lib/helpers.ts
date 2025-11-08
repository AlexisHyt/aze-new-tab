import Color from "color";

import type { IPreset } from "~scripts/popup/types";

export const strToBool = (str: string) => str === "true";

export const generateUuidV4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const darkenColor = (hexa: string, amount: number) => {
  const color = new Color(hexa);
  const alpha = color.alpha();
  const darkenedColor = color.darken(amount).rgb().object();
  return new Color({ ...darkenedColor, alpha: alpha + amount }).hexa();
};

export const rgbaString = (rgba: {
  r: number;
  g: number;
  b: number;
  a: number;
}) => {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
};

export const stringToRgba = (str: string) => {
  const col = Color(str);
  return {
    r: col.red(),
    g: col.green(),
    b: col.blue(),
    a: col.alpha(),
  };
};

export const readFileAsJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json: IPreset = JSON.parse(event.target.result as string);
        resolve(json);
      } catch (_error) {
        reject(new Error("Invalid JSON file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file);
  });
};

interface Setters {
  setFontFamily: (fontFamily: string) => Promise<void>;
  setSearchEngineBackgroundColor: (
    searchEngineBackgroundColor: string,
  ) => Promise<void>;
  setSearchEngineTextColor: (searchEngineTextColor: string) => Promise<void>;
  setSearchEnginePlaceholderColor: (
    searchEnginePlaceholderColor: string,
  ) => Promise<void>;
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
  setLinkCardBackgroundColor: (
    linkCardBackgroundColor: string,
  ) => Promise<void>;
  setCategoryBackgroundColor: (
    categoryBackgroundColor: string,
  ) => Promise<void>;
  setCategoryTextColor: (categoryTextColor: string) => Promise<void>;
}
export const applyPreset = async (preset: IPreset, setters: Setters) => {
  await setters.setFontFamily(preset.fontFamily);
  await setters.setSearchEngineBackgroundColor(
    preset.searchEngineBackgroundColor,
  );
  await setters.setSearchEngineTextColor(preset.searchEngineTextColor);
  await setters.setSearchEnginePlaceholderColor(
    preset.searchEnginePlaceholderColor,
  );
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
    categoryTextColor: getters.categoryTextColor,
  };
};
