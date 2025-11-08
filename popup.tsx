import React, { useState } from "react";
import { useSettingsConfig } from "~scripts/popup/settingsConfig"
import "./styles/popup.css";
import icon1024 from "data-base64:~assets/icon1024.png";
import {
  LuALargeSmall,
  LuBookCopy,
  LuBookmark,
  LuClock,
  LuFolders,
  LuImage,
  LuNewspaper,
  LuSearch
} from "react-icons/lu"
import { MyTitle } from "~components/popup/MyTitle";
import { MyToast } from "~components/popup/MyToast";
import {HorizontalSeparator} from "~components/HorizontalSeparator";

interface Tab {
  id: number;
  title: string;
  icon: React.ReactNode;
}
const tabs: Tab[] = [
  {
    id: 0,
    title: "Search Engine",
    icon: <LuSearch />
  },
  {
    id: 1,
    title: "Background",
    icon: <LuImage />
  },
  {
    id: 2,
    title: "Clock",
    icon: <LuClock />
  },
  {
    id: 3,
    title: "RSS",
    icon: <LuNewspaper />
  },
  {
    id: 4,
    title: "RSS Manager",
    icon: <LuNewspaper />
  },
  {
    id: 5,
    title: "Links Groups",
    icon: <LuFolders />
  },
  {
    id: 6,
    title: "Links",
    icon: <LuBookmark />
  },
  {
    id: 7,
    title: "Font",
    icon: <LuALargeSmall />
  },
  {
    id: 8,
    title: "Presets",
    icon: <LuBookCopy />
  },
]

export default function IndexPopup() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const settingsConfig = useSettingsConfig();

  return (
    <div>
      <div className={`flex items-center gap-2 mb-4`}>
        <img src={icon1024} alt="logo" className={`h-[50px]`} />
        <h1 className={`text-xl font-bold`}>Aze New Tab</h1>
        <MyToast />
      </div>
      <div className={`flex items-center flex-wrap gap-2 mb-4`}>
        {
          tabs.map(tab => (
            <div
              className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer ${activeTabIndex === tab.id ? "bg-blue-500 text-white" : ""}`}
              onClick={() => setActiveTabIndex(tab.id)}
            >
              {tab.icon}
              <p>{tab.title}</p>
            </div>
          ))
        }
      </div>
      <HorizontalSeparator width={"50%"} className={"!m-auto !my-4"} />
      <div className={`grid grid-cols-2 gap-5`}>
        {
          settingsConfig
            .filter(setting => setting.tabIndex === activeTabIndex)
            .map(setting => setting.isTitle ? (
              <MyTitle text={setting.text} />
            ) : (
              setting.form
            ))
        }
      </div>
    </div>
  )
}
