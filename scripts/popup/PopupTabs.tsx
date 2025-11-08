import type React from "react";
import {
  LuALargeSmall,
  LuBookCopy,
  LuBookmark,
  LuClock,
  LuFolders,
  LuImage,
  LuNewspaper,
  LuSearch,
} from "react-icons/lu";

interface Tab {
  id: number;
  title: string;
  icon: React.ReactNode;
}

export const popupTabs: Tab[] = [
  {
    id: 0,
    title: "Search Engine",
    icon: <LuSearch />,
  },
  {
    id: 1,
    title: "Background",
    icon: <LuImage />,
  },
  {
    id: 2,
    title: "Clock",
    icon: <LuClock />,
  },
  {
    id: 3,
    title: "RSS",
    icon: <LuNewspaper />,
  },
  {
    id: 4,
    title: "RSS Manager",
    icon: <LuNewspaper />,
  },
  {
    id: 5,
    title: "Links Groups",
    icon: <LuFolders />,
  },
  {
    id: 6,
    title: "Links",
    icon: <LuBookmark />,
  },
  {
    id: 7,
    title: "Font",
    icon: <LuALargeSmall />,
  },
  {
    id: 8,
    title: "Presets",
    icon: <LuBookCopy />,
  },
];
