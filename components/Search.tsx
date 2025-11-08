import { useStorage } from "@plasmohq/storage/hook";
import type React from "react";
import { darkenColor } from "~lib/helpers";
import {
  SEARCH_ENGINE_BACKGROUND_COLOR__DEFAULT,
  SEARCH_ENGINE_PLACEHOLDER_COLOR__DEFAULT,
  SEARCH_ENGINE_TEXT_COLOR__DEFAULT,
} from "~scripts/defaultValues";
import { defaultSearchEngines } from "~scripts/popup/constants";
import {
  SEARCH_ENGINE,
  SEARCH_ENGINE_BACKGROUND_COLOR,
  SEARCH_ENGINE_PLACEHOLDER_COLOR,
  SEARCH_ENGINE_TEXT_COLOR,
} from "~scripts/storage";

export function Search() {
  const [searchEngine, _] = useStorage(
    SEARCH_ENGINE,
    JSON.parse(defaultSearchEngines[0].value),
  );
  const [searchEngineTextColor] = useStorage(
    SEARCH_ENGINE_TEXT_COLOR,
    SEARCH_ENGINE_TEXT_COLOR__DEFAULT,
  );
  const [searchEnginePlaceholderColor] = useStorage(
    SEARCH_ENGINE_PLACEHOLDER_COLOR,
    SEARCH_ENGINE_PLACEHOLDER_COLOR__DEFAULT,
  );
  const [searchEngineBackgroundColor] = useStorage(
    SEARCH_ENGINE_BACKGROUND_COLOR,
    SEARCH_ENGINE_BACKGROUND_COLOR__DEFAULT,
  );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={`Search with ${searchEngine.name}`}
        className={`background-hover-reactive w-full border-none rounded-full outline-none text-lg p-2 pl-12`}
        style={
          {
            color: searchEngineTextColor,
            "--color-placeholder": searchEnginePlaceholderColor,
            "--bg-color": searchEngineBackgroundColor,
            "--bg-color-hover": darkenColor(searchEngineBackgroundColor, 0.1),
          } as React.CSSProperties
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.location.replace(
              `${searchEngine.link.replaceAll("%input%", e.currentTarget.value)}`,
            );
          }
        }}
      />
      <img
        src={searchEngine.logo}
        alt="favicon"
        className={`absolute top-0 left-3 h-[50%] transform translate-y-1/2`}
      />
    </div>
  );
}
