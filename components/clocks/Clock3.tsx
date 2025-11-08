import { useStorage } from "@plasmohq/storage/hook";
import type React from "react";
import { useEffect, useState } from "react";
import {
  CLOCK_COLOR__DEFAULT,
  CLOCK_SHADOW_COLOR__DEFAULT,
  CLOCK_SHOW_SECONDS__DEFAULT,
} from "~scripts/defaultValues";
import {
  CLOCK_COLOR,
  CLOCK_SHADOW_COLOR,
  CLOCK_SHOW_SECONDS,
} from "~scripts/storage";

const rotation = {
  " ": [135, 135],
  "┘": [180, 270],
  "└": [0, 270],
  "┐": [90, 180],
  "┌": [0, 90],
  "-": [0, 180],
  "|": [90, 270],
};
const digits = {
  "0": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘",
  ],
  "1": [
    "┌",
    "-",
    "┐",
    " ",
    "└",
    "┐",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    "┌",
    "┘",
    "└",
    "┐",
    "└",
    "-",
    "-",
    "┘",
  ],
  "2": [
    "┌",
    "-",
    "-",
    "┐",
    "└",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "└",
    "-",
    "-",
    "┘",
  ],
  "3": [
    "┌",
    "-",
    "-",
    "┐",
    "└",
    "-",
    "┐",
    "|",
    " ",
    "┌",
    "┘",
    "|",
    " ",
    "└",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘",
  ],
  "4": [
    "┌",
    "┐",
    "┌",
    "┐",
    "|",
    "|",
    "|",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "└",
    "┘",
  ],
  "5": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "└",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘",
  ],
  "6": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘",
  ],
  "7": [
    "┌",
    "-",
    "-",
    "┐",
    "└",
    "-",
    "┐",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "└",
    "┘",
  ],
  "8": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘",
  ],
  "9": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘",
  ],
};

export function Clock3() {
  const [clockColor] = useStorage(CLOCK_COLOR, CLOCK_COLOR__DEFAULT);
  const [clockShadowColor] = useStorage(
    CLOCK_SHADOW_COLOR,
    CLOCK_SHADOW_COLOR__DEFAULT,
  );
  const [clockShowSeconds] = useStorage(
    CLOCK_SHOW_SECONDS,
    CLOCK_SHOW_SECONDS__DEFAULT,
  );
  const [digitsRotations, setDigitsRotations] = useState({
    "hour-tens": digits["0"],
    "hour-ones": digits["0"],
    "minute-tens": digits["0"],
    "minute-ones": digits["0"],
    "second-tens": digits["0"],
    "second-ones": digits["0"],
  });

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      if (clockShowSeconds) {
        setDigitsRotations({
          "hour-tens": digits[hours[0]],
          "hour-ones": digits[hours[1]],
          "minute-tens": digits[minutes[0]],
          "minute-ones": digits[minutes[1]],
          "second-tens": digits[seconds[0]],
          "second-ones": digits[seconds[1]],
        });
      } else {
        setDigitsRotations({
          "hour-tens": digits[hours[0]],
          "hour-ones": digits[hours[1]],
          "minute-tens": digits[minutes[0]],
          "minute-ones": digits[minutes[1]],
          "second-tens": digits["0"],
          "second-ones": digits["0"],
        });
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [clockShowSeconds]);

  return (
    <div
      className={`font-bold drop-shadow-[0_2px_2px_var(--drop-shadow-color)] text-[10vh] my-6 text-center w-full`}
      style={
        {
          color: clockColor,
          "--drop-shadow-color": clockShadowColor,
        } as React.CSSProperties
      }
    >
      <div className="flex items-center gap-2 time">
        <div className="flex gap-6 hours">
          <div className="grid grid-cols-4 grid-rows-6 gap-1 hour-tens">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                className="h-6 w-6 relative bg-black/5 rounded-full"
                key={index}
              >
                <div
                  style={
                    {
                      "--tw-rotate": `${rotation[digitsRotations["hour-tens"][index]][0]}deg`,
                      backgroundColor: clockColor,
                    } as React.CSSProperties
                  }
                  className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                ></div>
                <div
                  style={
                    {
                      "--tw-rotate": `${rotation[digitsRotations["hour-tens"][index]][1]}deg`,
                      backgroundColor: clockColor,
                    } as React.CSSProperties
                  }
                  className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                ></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 grid-rows-6 gap-1 hour-ones">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                className="h-6 w-6 relative bg-black/5 rounded-full"
                key={index}
              >
                <div
                  style={
                    {
                      "--tw-rotate": `${rotation[digitsRotations["hour-ones"][index]][0]}deg`,
                      backgroundColor: clockColor,
                    } as React.CSSProperties
                  }
                  className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                ></div>
                <div
                  style={
                    {
                      "--tw-rotate": `${rotation[digitsRotations["hour-ones"][index]][1]}deg`,
                      backgroundColor: clockColor,
                    } as React.CSSProperties
                  }
                  className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-end items-end gap-4 mx-4 h-full">
          <div
            className="w-2.5 h-2.5 border-2"
            style={{ borderColor: clockColor }}
          ></div>
          <div
            className="w-2.5 h-2.5 border-2"
            style={{ borderColor: clockColor }}
          ></div>
        </div>
        <div className="flex gap-6 minutes">
          <div className="grid grid-cols-4 grid-rows-6 gap-1 minute-tens">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                className="h-6 w-6 relative bg-black/5 rounded-full"
                key={index}
              >
                <div
                  style={
                    {
                      "--tw-rotate": `${rotation[digitsRotations["minute-tens"][index]][0]}deg`,
                      backgroundColor: clockColor,
                    } as React.CSSProperties
                  }
                  className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                ></div>
                <div
                  style={
                    {
                      "--tw-rotate": `${rotation[digitsRotations["minute-tens"][index]][1]}deg`,
                      backgroundColor: clockColor,
                    } as React.CSSProperties
                  }
                  className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                ></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 grid-rows-6 gap-1 minute-ones">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                className="h-6 w-6 relative bg-black/5 rounded-full"
                key={index}
              >
                <div
                  style={
                    {
                      "--tw-rotate": `${rotation[digitsRotations["minute-ones"][index]][0]}deg`,
                      backgroundColor: clockColor,
                    } as React.CSSProperties
                  }
                  className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                ></div>
                <div
                  style={
                    {
                      "--tw-rotate": `${rotation[digitsRotations["minute-ones"][index]][1]}deg`,
                      backgroundColor: clockColor,
                    } as React.CSSProperties
                  }
                  className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                ></div>
              </div>
            ))}
          </div>
        </div>
        {clockShowSeconds && (
          <>
            <div className="flex flex-col justify-end items-end gap-4 mx-4 h-full">
              <div
                className="w-2.5 h-2.5 border-2"
                style={{ borderColor: clockColor }}
              ></div>
              <div
                className="w-2.5 h-2.5 border-2"
                style={{ borderColor: clockColor }}
              ></div>
            </div>
            <div className="flex gap-6 seconds">
              <div className="grid grid-cols-4 grid-rows-6 gap-1 second-tens">
                {Array.from({ length: 24 }).map((_, index) => (
                  <div
                    className="h-6 w-6 relative bg-black/5 rounded-full"
                    key={index}
                  >
                    <div
                      style={
                        {
                          "--tw-rotate": `${rotation[digitsRotations["second-tens"][index]][0]}deg`,
                          backgroundColor: clockColor,
                        } as React.CSSProperties
                      }
                      className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                    ></div>
                    <div
                      style={
                        {
                          "--tw-rotate": `${rotation[digitsRotations["second-tens"][index]][1]}deg`,
                          backgroundColor: clockColor,
                        } as React.CSSProperties
                      }
                      className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 grid-rows-6 gap-1 second-ones">
                {Array.from({ length: 24 }).map((_, index) => (
                  <div
                    className="h-6 w-6 relative bg-black/5 rounded-full"
                    key={index}
                  >
                    <div
                      style={
                        {
                          "--tw-rotate": `${rotation[digitsRotations["second-ones"][index]][0]}deg`,
                          backgroundColor: clockColor,
                        } as React.CSSProperties
                      }
                      className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                    ></div>
                    <div
                      style={
                        {
                          "--tw-rotate": `${rotation[digitsRotations["second-ones"][index]][1]}deg`,
                          backgroundColor: clockColor,
                        } as React.CSSProperties
                      }
                      className={`w-1/2 h-1 absolute origin-[center_left] top-1/2 left-1/2 -translate-y-1/2 transition-all duration-250 rounded-full`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
