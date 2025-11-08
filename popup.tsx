import { useState } from "react";
import { useSettingsConfig } from "~scripts/popup/settingsConfig";
import "./styles/popup.css";
import icon1024 from "data-base64:~assets/icon1024.png";
import { HorizontalSeparator } from "~components/HorizontalSeparator";
import { PopupTitle } from "~components/popup/PopupTitle";
import { PopupToast } from "~components/popup/PopupToast";
import { popupTabs } from "~scripts/popup/PopupTabs";

export default function IndexPopup() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const settingsConfig = useSettingsConfig();

  return (
    <div>
      <div className={`flex items-center gap-2 mb-4`}>
        <img src={icon1024} alt="logo" className={`h-[50px]`} />
        <h1 className={`text-xl font-bold`}>Aze New Tab</h1>
        <PopupToast />
      </div>
      <div className={`flex items-center flex-wrap gap-2 mb-4`}>
        {popupTabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer ${activeTabIndex === tab.id ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setActiveTabIndex(tab.id)}
            onKeyDown={(e) => e.key === "Enter" && setActiveTabIndex(tab.id)}
          >
            {tab.icon}
            <p>{tab.title}</p>
          </button>
        ))}
      </div>
      <HorizontalSeparator width={"50%"} className={"!m-auto !my-4"} />
      <div className={`grid grid-cols-2 gap-5`}>
        {settingsConfig
          .filter((setting) => setting.tabIndex === activeTabIndex)
          .map((setting, index) =>
            setting.isTitle ? (
              <PopupTitle text={setting.text} key={index} />
            ) : (
              setting.form
            ),
          )}
      </div>
    </div>
  );
}
