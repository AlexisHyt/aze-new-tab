import { useStorage } from "@plasmohq/storage/hook";
import { Clock1 } from "~components/clocks/Clock1";
import { Clock2 } from "~components/clocks/Clock2";
import { Clock3 } from "~components/clocks/Clock3";
import { CLOCK_STYLE__DEFAULT } from "~scripts/defaultValues";
import { CLOCK_STYLE } from "~scripts/storage";

export const CLOCKS = {
  DEFAULT: {
    label: "Default",
    value: "default",
    component: <Clock1 />,
  },
  EMOJIS: {
    label: "Emojis",
    value: "emojis",
    component: <Clock2 />,
  },
  DIGITALCLOCKS: {
    label: "Digital Clocks",
    value: "digitalclocks",
    component: <Clock3 />,
  },
};

export function Clock() {
  const [clockStyle] = useStorage(CLOCK_STYLE, CLOCK_STYLE__DEFAULT);

  const chooseClock = () => {
    const usedClock = Object.entries(CLOCKS).find(
      ([, { value }]) => value === clockStyle,
    );

    if (!usedClock) {
      return <Clock1 />;
    }

    return usedClock[1].component;
  };

  return <>{chooseClock()}</>;
}
