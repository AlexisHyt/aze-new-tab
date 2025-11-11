import { Background } from "~components/Background";
import "./styles/style.css";
import { useStorage } from "@plasmohq/storage/hook";
import type React from "react";
import { CategoryCreator } from "~components/CategoryCreator";
import { Clock } from "~components/Clock";
import { GoShortcut } from "~components/GoShortcut";
import { GroupSelector } from "~components/GroupSelector";
import { Links } from "~components/Links";
import { RSSFeed } from "~components/RSSFeed";
import { Search } from "~components/Search";
import { useGoogleFonts } from "~node_modules/@flyyer/use-googlefonts";
import { FONT_FAMILY_KEY__DEFAULT } from "~scripts/defaultValues";
import type { IGroup } from "~scripts/popup/types";
import { ACTIVE_GROUP, FONT_FAMILY_KEY } from "~scripts/storage";

export default function NewTabPage() {
  const [activeGroup] = useStorage(ACTIVE_GROUP, {} as IGroup);
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
        <div
          className={`px-16 py-8 flex flex-col justify-around gap-5 max-h-screen`}
        >
          <div className={`h-[40vh] flex flex-col justify-start gap-5 z-50`}>
            <div className={`flex items-center gap-5 z-50`}>
              <Search />
              <GoShortcut />
            </div>
            <Clock />
            <div className={`flex items-center gap-5 z-50`}>
              <GroupSelector />
              {activeGroup.id && <CategoryCreator />}
            </div>
          </div>
          <div className={`h-full overflow-y-auto`}>
            <Links />
          </div>
        </div>
        <div className={`p-16 flex justify-end`}>
          <RSSFeed />
        </div>
      </main>
    </>
  );
}
