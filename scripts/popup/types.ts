import type { ReactNode } from "react";

export interface ISetting {
  text?: string;
  form?: ReactNode;
  label?: string;
  isTitle?: boolean;
  tabIndex: number;
}

export interface ICustomSearchEngine {
  name: string;
  link: string;
  logo: string;
}

export interface IRSSFeed {
  name: string;
  link: string;
  logo: string;
}

export interface IGroup {
  id: string;
  name: string;
  logo?: string | null;
}

export interface ICategory {
  id: string;
  name: string;
  logo?: string | null;
  groupId: string;
}

export interface ILink {
  id: string;
  name: string;
  link: string;
  logo?: string | null;
  categoryId: string;
}

export interface IPreset {
  id: string;
  name: string;
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

export interface IColorPickerEvent {
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}
