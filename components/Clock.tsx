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
	},
	EMOJIS: {
		label: "Emojis",
		value: "emojis",
	},
	DIGITALCLOCKS: {
		label: "Digital Clocks",
		value: "digitalclocks",
	},
};

export function Clock() {
	const [clockStyle] = useStorage(CLOCK_STYLE, CLOCK_STYLE__DEFAULT);

	const chooseClock = () => {
		switch (clockStyle) {
			case CLOCKS.DEFAULT.value:
				return <Clock1 />;
			case CLOCKS.EMOJIS.value:
				return <Clock2 />;
			case CLOCKS.DIGITALCLOCKS.value:
				return <Clock3 />;
			default:
				return <Clock1 />;
		}
	};

	return <>{chooseClock()}</>;
}
