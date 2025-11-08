import { Background } from "~components/Background";
import "./styles/style.css";
import { useStorage } from "@plasmohq/storage/hook";
import type React from "react";
import { CategoryCreator } from "~components/CategoryCreator";
import { Clock } from "~components/Clock";
import { GroupSelector } from "~components/GroupSelector";
import { Links } from "~components/Links";
import { RSSFeed } from "~components/RSSFeed";
import { Search } from "~components/Search";
import {
	GoogleFontsStatus,
	useGoogleFonts,
} from "~node_modules/@flyyer/use-googlefonts";
import { FONT_FAMILY_KEY__DEFAULT } from "~scripts/defaultValues";
import type { Group } from "~scripts/popup/settingsConfig";
import { ACTIVE_GROUP, FONT_FAMILY_KEY } from "~scripts/storage";

export default function NewTabPage() {
	const [activeGroup] = useStorage(ACTIVE_GROUP, {} as Group);
	const [fontFamily] = useStorage(FONT_FAMILY_KEY, FONT_FAMILY_KEY__DEFAULT);

	useGoogleFonts([
		{
			family: fontFamily,
			styles: [
				"100",
				"200",
				"300",
				"regular",
				"500",
				"600",
				"700",
				"800",
				"900",
				"italic",
			],
		},
	]);

	return (
		<>
			<Background />
			<main
				className={`grid grid-cols-2 gap-5 h-screen overflow-hidden`}
				style={{ "--font-family": fontFamily } as React.CSSProperties}
			>
				<div className={`p-16 flex flex-col justify-start gap-5`}>
					<Search />
					<Clock />
					<div className={`flex items-center gap-5`}>
						<GroupSelector />
						{activeGroup.id && <CategoryCreator />}
					</div>
					<Links />
				</div>
				<div className={`p-16 flex justify-end`}>
					<RSSFeed />
				</div>
			</main>
		</>
	);
}
