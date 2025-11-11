import goLogo from "data-base64:~/assets/go.png";
import { useStorage } from "@plasmohq/storage/hook";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { getGoShortcuts, type Shortcuts } from "~lib/go-shortcut";
import { darkenColor } from "~lib/helpers";
import {
  SEARCH_ENGINE_BACKGROUND_COLOR__DEFAULT,
  SEARCH_ENGINE_TEXT_COLOR__DEFAULT,
} from "~scripts/defaultValues";
import {
  SEARCH_ENGINE_BACKGROUND_COLOR,
  SEARCH_ENGINE_TEXT_COLOR,
} from "~scripts/storage";

export const GoShortcut = () => {
  const [searchEngineTextColor] = useStorage(
    SEARCH_ENGINE_TEXT_COLOR,
    SEARCH_ENGINE_TEXT_COLOR__DEFAULT,
  );
  const [searchEngineBackgroundColor] = useStorage(
    SEARCH_ENGINE_BACKGROUND_COLOR,
    SEARCH_ENGINE_BACKGROUND_COLOR__DEFAULT,
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [goShortcuts, setGoShortcuts] = useState<Shortcuts | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadGoShortcuts = async () => {
      const shortcuts = await getGoShortcuts();
      console.log(shortcuts);
      setGoShortcuts(
        shortcuts && Object.keys(shortcuts).length > 0 ? shortcuts : null,
      );
    };
    loadGoShortcuts();
  }, []);

  return (
    <div ref={containerRef}>
      {goShortcuts && Object.keys(goShortcuts).length > 0 && (
        <>
          <button
            type="button"
            className="background-hover-reactive h-full border-none rounded-full outline-none text-lg py-2 px-6 flex items-center gap-2"
            style={
              {
                color: searchEngineTextColor,
                "--bg-color": searchEngineBackgroundColor,
                "--bg-color-hover": darkenColor(
                  searchEngineBackgroundColor,
                  0.1,
                ),
              } as React.CSSProperties
            }
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img src={goLogo} alt="Go Shortcuts" style={{ height: "28px" }} />
          </button>
          {isDropdownOpen && (
            <div className="absolute contextual rounded-md bg-black border border-white mt-2 w-[15vw] max-h-[40vh] overflow-x-hidden overflow-y-auto flex flex-col gap-2 z-50">
              {Object.entries(goShortcuts).map(([key, value], index) => (
                <button
                  key={index}
                  type="button"
                  className={`text-white  shadow-md px-5 py-4 text-left hover:bg-gray-900 text-lg flex items-center gap-2`}
                >
                  <a
                    href={value}
                    rel="noreferrer"
                    className={`flex flex-col gap-1`}
                  >
                    {key}
                    <span
                      className={`text-gray-600 text-xs overflow-hidden inline-block w-[13vw] truncate`}
                    >
                      {value}
                    </span>
                  </a>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
