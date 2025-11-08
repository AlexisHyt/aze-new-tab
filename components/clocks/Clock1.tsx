import { useStorage } from "@plasmohq/storage/hook";
import type React from "react";
import { useEffect, useState } from "react";
import {
  CLOCK_COLOR__DEFAULT,
  CLOCK_SHADOW_COLOR__DEFAULT,
} from "~scripts/defaultValues";
import {
  CLOCK_COLOR,
  CLOCK_SHADOW_COLOR,
  CLOCK_SHOW_SECONDS,
} from "~scripts/storage";

export function Clock1() {
  const [time, setTime] = useState("");
  const [clockShowSeconds, _] = useStorage(CLOCK_SHOW_SECONDS, true);

  const [clockColor] = useStorage(CLOCK_COLOR, CLOCK_COLOR__DEFAULT);
  const [clockShadowColor] = useStorage(
    CLOCK_SHADOW_COLOR,
    CLOCK_SHADOW_COLOR__DEFAULT,
  );

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      setTime(
        clockShowSeconds
          ? `${hours}:${minutes}:${seconds}`
          : `${hours}:${minutes}`,
      );
    }, 500);

    return () => clearInterval(intervalId);
  }, [clockShowSeconds]);

  return (
    <div
      className={`font-bold drop-shadow-[0_2px_2px_var(--drop-shadow-color)] text-[15vh] text-center w-full tracking-widest`}
      style={
        {
          color: clockColor,
          "--drop-shadow-color": clockShadowColor,
        } as React.CSSProperties
      }
    >
      {time}
    </div>
  );
}
