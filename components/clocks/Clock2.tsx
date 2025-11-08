import React, { useEffect, useState } from "react"
import {
  CLOCK_SHADOW_COLOR,
  CLOCK_SHOW_SECONDS
} from "~scripts/storage"
import {useStorage} from "@plasmohq/storage/hook";
import {
  CLOCK_SHADOW_COLOR__DEFAULT
} from "~scripts/defaultValues"

export function Clock2() {
  const [time, setTime] = useState('');
  const [clockShowSeconds, _] = useStorage(CLOCK_SHOW_SECONDS, true);

  const [clockShadowColor] = useStorage(CLOCK_SHADOW_COLOR, CLOCK_SHADOW_COLOR__DEFAULT);

  const digitToEmoji = (digit: string) => {
    switch (digit) {
      case "0":
        return "0️⃣";
      case "1":
        return "1️⃣";
      case "2":
        return "2️⃣";
      case "3":
        return "3️⃣";
      case "4":
        return "4️⃣";
      case "5":
        return "5️⃣";
      case "6":
        return "6️⃣";
      case "7":
        return "7️⃣";
      case "8":
        return "8️⃣";
      case "9":
        return "9️⃣";
    }
  }

  const replaceDigitsWithEmojis = (text: string) => {
    return text.replace(/[0-9]/g, digitToEmoji);
  }

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      setTime(clockShowSeconds
        ? `${hours}:${minutes}:${seconds}`
        : `${hours}:${minutes}`);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`font-bold drop-shadow-[0_2px_2px_var(--drop-shadow-color)] text-[10vh] text-center w-full`}
      style={{ color: "#559FF2", "--drop-shadow-color": clockShadowColor } as React.CSSProperties}
    >
      {replaceDigitsWithEmojis(time)}
    </div>
  );
}