import React, { Fragment, type ReactNode } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { MyButton } from "~components/popup/MyButton";
import { MyInput } from "~components/popup/MyInput";
import { MyLabel } from "~components/popup/MyLabel"
import { MySelect } from "~components/popup/MySelect"
import {
  ACTIVE_GROUP,
  ACTIVE_RSS_FEED,
  BACKGROUND_KEY,
  CARD_LINK_BG_COLOR,
  CARD_LINK_TEXT_COLOR,
  CATEGORY_BG_COLOR,
  CATEGORY_TEXT_COLOR,
  CLOCK_COLOR,
  CLOCK_SHADOW_COLOR,
  CLOCK_SHOW_SECONDS,
  CLOCK_STYLE,
  CUSTOM_SEARCH_ENGINE,
  FONT_FAMILY_KEY,
  GROUPS,
  PRESETS,
  RSS_ACTIVE_COLOR,
  RSS_BG_COLOR,
  RSS_DATE_COLOR,
  RSS_ENABLE,
  RSS_FEEDS,
  RSS_TITLE_COLOR,
  SEARCH_ENGINE,
  SEARCH_ENGINE_BACKGROUND_COLOR,
  SEARCH_ENGINE_PLACEHOLDER_COLOR,
  SEARCH_ENGINE_TEXT_COLOR
} from "../storage"
import type {ToastData} from "~components/popup/MyToast";
import {InputHelper} from "~components/InputHelper";
import {MySwitch} from "~components/popup/MySwitch";
import {
  applyPreset,
  buildPreset,
  generateUuidV4,
  readFileAsJson,
  rgbaString,
  stringToRgba,
  strToBool
} from "~lib/helpers"
import { ChromePicker } from 'react-color';
import {
  CARD_LINK_BG_COLOR__DEFAULT,
  CARD_LINK_TEXT_COLOR__DEFAULT,
  CATEGORY_BG_COLOR__DEFAULT,
  CATEGORY_TEXT_COLOR__DEFAULT,
  CLOCK_COLOR__DEFAULT,
  CLOCK_SHADOW_COLOR__DEFAULT,
  CLOCK_SHOW_SECONDS__DEFAULT,
  CLOCK_STYLE__DEFAULT,
  FONT_FAMILY_KEY__DEFAULT,
  RSS_ACTIVE_COLOR__DEFAULT,
  RSS_BG_COLOR__DEFAULT,
  RSS_DATE_COLOR__DEFAULT,
  RSS_SHOW__DEFAULT,
  RSS_TITLE_COLOR__DEFAULT,
  SEARCH_ENGINE_BACKGROUND_COLOR__DEFAULT,
  SEARCH_ENGINE_PLACEHOLDER_COLOR__DEFAULT,
  SEARCH_ENGINE_TEXT_COLOR__DEFAULT
} from "~scripts/defaultValues"
import {MyTextarea} from "~components/popup/MyTextarea";
import {VerticalSeparator} from "~components/VerticalSeparator";
import { CLOCKS } from "~components/Clock"


export interface Setting {
  text?: string
  form?: ReactNode
  label?: string
  isTitle?: boolean
  tabIndex: number
}

interface CustomSearchEngine {
  name: string
  link: string
  logo: string
}
export interface RSSFeed {
  name: string
  link: string
  logo: string
}
export interface Group {
  id: string;
  name: string;
  logo?: string | null;
}
export interface Category {
  id: string;
  name: string;
  logo?: string | null;
  groupId: string;
}
export interface Link {
  id: string;
  name: string;
  link: string;
  logo?: string | null;
  categoryId: string;
}
export interface Preset {
  id: string;
  name: string;
  fontFamily: string;
  searchEngineBackgroundColor: string;
  searchEngineTextColor: string;
  searchEnginePlaceholderColor: string;
  background: string;
  clockStyle: string;
  clockShowSeconds: string;
  clockColor: string;
  clockShadowColor: string;
  rssShow: string;
  rssTitleColor: string;
  rssDateColor: string;
  rssBackgroundColor: string;
  rssActiveColor: string;
  linkCardTextColor: string;
  linkCardBackgroundColor: string;
  categoryBackgroundColor: string;
  categoryTextColor: string;
}

interface ColorPickerEvent {
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  }
}

export const defaultSearchEngines = [
  {
    value: JSON.stringify({
      name: 'Google',
      link: 'https://www.google.fr/search?q=%input%',
      logo: 'https://www.google.com/favicon.ico'
    }),
    label: 'Google',
  },
  {
    value: JSON.stringify({
      name: 'DuckDuckGo',
      link: 'https://duckduckgo.com/?q=%input%',
      logo: 'https://duckduckgo.com/favicon.ico'
    }),
    label: 'DuckDuckGo',
  },
  {
    value: JSON.stringify({
      name: 'Bing',
      link: 'https://www.bing.com/search?q=%input%',
      logo: 'https://www.bing.com/favicon.ico'
    }),
    label: 'Bing',
  },
  {
    value: JSON.stringify({
      name: 'Yahoo',
      link: 'https://search.yahoo.com/search?p=%input%',
      logo: 'https://www.yahoo.com/favicon.ico'
    }),
    label: 'Yahoo',
  },
  {
    value: JSON.stringify({
      name: 'Ecosia',
      link: 'https://www.ecosia.org/search?q=%input%',
      logo: 'https://www.ecosia.org/favicon.ico'
    }),
    label: 'Ecosia',
  },
  {
    value: JSON.stringify({
      name: 'Qwant',
      link: 'https://www.qwant.com/?q=test%input%',
      logo: 'https://www.qwant.com/favicon.ico'
    }),
    label: 'Qwant',
  },
  {
    value: JSON.stringify({
      name: 'Brave Search',
      link: 'https://search.brave.com/search?q=%input%',
      logo: 'https://cdn.search.brave.com/serp/v2/_app/immutable/assets/brave-logo-dark.Bg87GL4b.svg'
    }),
    label: 'Brave Search',
  }
];
const getSearchEngines = (customSearchEngines: CustomSearchEngine[]) => {
  const computedCustomSearchEngines = customSearchEngines.map((customSearchEngine: CustomSearchEngine) => {
    return {
      value: JSON.stringify(customSearchEngine),
      label: customSearchEngine.name
    }
  });

  return [...defaultSearchEngines, ...computedCustomSearchEngines];
}
const getRssFeeds = (rssFeeds: RSSFeed[]) => {
  const computedCustomSearchEngines = rssFeeds.map((rssFeed: RSSFeed) => {
    return {
      value: JSON.stringify(rssFeed),
      label: rssFeed.name
    }
  });

  return [...computedCustomSearchEngines];
}
const getGroups = (groups: Group[]) => {
  const computedCustomSearchEngines = groups.map((group: Group) => {
    return {
      value: JSON.stringify(group),
      label: group.name
    }
  });

  return [...computedCustomSearchEngines];
}
const getPresets = (presets: Preset[]) => {
  const data = presets.map((preset: Preset) => {
    return {
      value: JSON.stringify(preset),
      label: preset.name
    }
  });

  return [...data];
}

export const useSettingsConfig = (): Setting[] => {
  // Search Engine
  const [searchEngine, setSearchEngine] = useStorage(SEARCH_ENGINE, {} as CustomSearchEngine);
  const [customSearchEngines, setCustomSearchEngines] = useStorage(CUSTOM_SEARCH_ENGINE, [] as CustomSearchEngine[]);
  const [searchEngineTextColor, setSearchEngineTextColor, {setRenderValue: setSearchEngineTextColorRenderValue}] = useStorage(SEARCH_ENGINE_TEXT_COLOR, SEARCH_ENGINE_TEXT_COLOR__DEFAULT);
  const [searchEnginePlaceholderColor, setSearchEnginePlaceholderColor, {setRenderValue: setSearchEnginePlaceholderColorRenderValue}] = useStorage(SEARCH_ENGINE_PLACEHOLDER_COLOR, SEARCH_ENGINE_PLACEHOLDER_COLOR__DEFAULT);
  const [searchEngineBackgroundColor, setSearchEngineBackgroundColor, {setRenderValue: setSearchEngineBackgroundColorRenderValue}] = useStorage(SEARCH_ENGINE_BACKGROUND_COLOR, SEARCH_ENGINE_BACKGROUND_COLOR__DEFAULT);
  //Background
  const [background, setBackground, {setRenderValue: setBackgroundRenderValue}] = useStorage(BACKGROUND_KEY, "");
  // Clock
  const [clockColor, setClockColor, {setRenderValue: setClockColorRenderValue}] = useStorage(CLOCK_COLOR, CLOCK_COLOR__DEFAULT);
  const [clockShadowColor, setClockShadowColor, {setRenderValue: setClockShadowColorRenderValue}] = useStorage(CLOCK_SHADOW_COLOR, CLOCK_SHADOW_COLOR__DEFAULT);
  const [clockStyle, setClockStyle] = useStorage(CLOCK_STYLE, CLOCK_STYLE__DEFAULT);
  const [clockShowSeconds, setClockShowSeconds] = useStorage(CLOCK_SHOW_SECONDS, CLOCK_SHOW_SECONDS__DEFAULT);
  // RSS
  const [rssShow, setRssShow] = useStorage(RSS_ENABLE, RSS_SHOW__DEFAULT);
  const [rssTitleColor, setRssTitleColor, {setRenderValue: setRssTitleColorRenderValue}] = useStorage(RSS_TITLE_COLOR, RSS_TITLE_COLOR__DEFAULT);
  const [rssDateColor, setRssDateColor, {setRenderValue: setRssDateColorRenderValue}] = useStorage(RSS_DATE_COLOR, RSS_DATE_COLOR__DEFAULT);
  const [rssBackgroundColor, setRssBackgroundColor, {setRenderValue: setRssBackgroundColorRenderValue}] = useStorage(RSS_BG_COLOR, RSS_BG_COLOR__DEFAULT);
  const [rssActiveColor, setRssActiveColor, {setRenderValue: setRssActiveColorRenderValue}] = useStorage(RSS_ACTIVE_COLOR, RSS_ACTIVE_COLOR__DEFAULT);
  const [rssActive, setRssActive] = useStorage(ACTIVE_RSS_FEED, {} as RSSFeed);
  const [rssFeeds, setRssFeeds] = useStorage(RSS_FEEDS, [] as RSSFeed[]);
  // Groups
  const [groups, setGroups] = useStorage(GROUPS, []);
  const [activeGroup, setActiveGroup] = useStorage(ACTIVE_GROUP, {} as Group);
  // Links & Categories
  const [categoryBackgroundColor, setCategoryBackgroundColor, {setRenderValue: setCategoryBackgroundColorRenderValue}] = useStorage(CATEGORY_BG_COLOR, CATEGORY_BG_COLOR__DEFAULT);
  const [categoryTextColor, setCategoryTextColor, {setRenderValue: setCategoryTextColorRenderValue}] = useStorage(CATEGORY_TEXT_COLOR, CATEGORY_TEXT_COLOR__DEFAULT);
  const [linkCardBackgroundColor, setLinkCardBackgroundColor, {setRenderValue: setLinkCardBackgroundColorRenderValue}] = useStorage(CARD_LINK_BG_COLOR, CARD_LINK_BG_COLOR__DEFAULT);
  const [linkCardTextColor, setLinkCardTextColor, {setRenderValue: setLinkCardTextColorRenderValue}] = useStorage(CARD_LINK_TEXT_COLOR, CARD_LINK_TEXT_COLOR__DEFAULT);
  // Font
  const [fontFamily, setFontFamily, {setRenderValue: setFontFamilyRenderValue}] = useStorage(FONT_FAMILY_KEY, FONT_FAMILY_KEY__DEFAULT);
  // Preset
  const [presets, setPresets] = useStorage(PRESETS, [] as Preset[]);

  const [_, setToastData] = useStorage("toastData", {});

  return [
    {
      tabIndex: 0,
      form: (
        <Fragment>
          <form
            className={`col-span-full`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const searchEngine = formData.get("searchEngine") as string

              // Update search engine
              await setSearchEngine(JSON.parse(searchEngine))

              // Toast it
              await setToastData({
                type: "success",
                text: "Search engine changed!"
              } as ToastData)
            }}>
            <MyLabel text={"Search Engine"} htmlFor={"form-searchEngine"} />
            <div className={`flex items-center gap-2`}>
              <MySelect
                id={"form-searchEngine"}
                name={"searchEngine"}
                options={getSearchEngines(customSearchEngines)}
                selectedValue={JSON.stringify(searchEngine)}
              />
              <MyButton type={"submit"} text={"Change"} />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 0,
      form: (
        <Fragment>
          <form
            className={`col-span-full`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const customSearchEngine = {
                name: formData.get("customSearchEngine-name") as string,
                link: formData.get("customSearchEngine-link") as string,
                logo: formData.get("customSearchEngine-logo") as string
              }

              // Update custom search engines
              customSearchEngines.push(customSearchEngine)
              await setCustomSearchEngines(customSearchEngines)

              // Toast it
              await setToastData({
                type: "success",
                text: "Search engine created!"
              } as ToastData)
            }}>
            <MyLabel
              text={"Custom Search Engine"}
              htmlFor={"form-customSearchEngine-name"}
            />
            <div className={`flex items-center gap-2`}>
              <MyInput
                type={"text"}
                id={"form-customSearchEngine-name"}
                name={"customSearchEngine-name"}
                placeholder={"Name"}
              />
              <MyInput
                type={"text"}
                id={"form-customSearchEngine-link"}
                name={"customSearchEngine-link"}
                placeholder={"Link"}
              />
              <MyInput
                type={"text"}
                id={"form-customSearchEngine-logo"}
                name={"customSearchEngine-logo"}
                placeholder={"Logo"}
              />
              <MyButton
                type={"submit"}
                text={"Create"}
                bgColor={"bg-green-500"}
                hoverBgColor={"hover:bg-green-600"}
              />
            </div>
            <InputHelper
              text={
                "You can use %input% to get the search query (ex: link.com/search?q=%input%)."
              }
            />
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 0,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel text={"Search Text Color"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setSearchEngineTextColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setSearchEngineTextColor(rgbaString(color.rgb))
                }
                color={stringToRgba(searchEngineTextColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 0,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel text={"Search Placeholder Color"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setSearchEnginePlaceholderColorRenderValue(
                    rgbaString(color.rgb)
                  )
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setSearchEnginePlaceholderColor(rgbaString(color.rgb))
                }
                color={stringToRgba(searchEnginePlaceholderColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 0,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel text={"Search Background Color"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setSearchEngineBackgroundColorRenderValue(
                    rgbaString(color.rgb)
                  )
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setSearchEngineBackgroundColor(rgbaString(color.rgb))
                }
                color={stringToRgba(searchEngineBackgroundColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 1,
      form: (
        <Fragment>
          <form
            className={`col-span-12`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const background = formData.get("background") as string

              // Update search engine
              await setBackground(background)

              // Toast it
              await setToastData({
                type: "success",
                text: "Background changed!"
              } as ToastData)
            }}>
            <MyLabel
              text={"Background Image Url"}
              htmlFor={"form-background"}
            />
            <div className={`flex items-center gap-2`}>
              <MyInput
                type={"url"}
                id={"form-background"}
                name={"background"}
                value={background}
                onChange={(e) => setBackgroundRenderValue(e.target.value)}
              />
              <MyButton type={"submit"} text={"Change"} />
            </div>
            <InputHelper
              text={"You can either use a PNG/JPG or a GIF image."}
            />
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 2,
      form: (
        <Fragment>
          <form
            className={`col-span-full`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const value = formData.get("clockStyle") as string

              // Update search engine
              await setClockStyle(value)

              // Toast it
              await setToastData({
                type: "success",
                text: "Clock style changed!"
              } as ToastData)
            }}>
            <MyLabel text={"Clock Style"} htmlFor={"form-clockStyle"} />
            <div className={`flex items-center gap-2`}>
              <MySelect
                id={"form-clockStyle"}
                name={"clockStyle"}
                options={Object.entries(CLOCKS).map(([key, clock]) => {
                  return {
                    label: clock.label,
                    value: clock.value,
                  }
                })}
                selectedValue={clockStyle}
              />
              <MyButton type={"submit"} text={"Change"} />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 2,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel text={"Show seconds"} htmlFor={"form-clockShowSeconds"} />
            <div className={`flex items-center gap-2`}>
              <MySwitch
                onLabel={"Yes"}
                offLabel={"No"}
                initialValue={strToBool(clockShowSeconds)}
                onChange={(value) => setClockShowSeconds(value.toString())}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 2,
      form: (
        <Fragment>
          <form className={`col-span-6`}>
            <MyLabel text={"Text Color"} htmlFor={"form-clockColor"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setClockColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setClockColor(rgbaString(color.rgb))
                }
                color={stringToRgba(clockColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 2,
      form: (
        <Fragment>
          <form className={`col-span-6`}>
            <MyLabel text={"Shadow Color"} htmlFor={"form-clockShadowColor"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setClockShadowColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setClockShadowColor(rgbaString(color.rgb))
                }
                color={stringToRgba(clockShadowColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 3,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel text={"Show feed"} htmlFor={"form-rssShow"} />
            <div className={`flex items-center gap-2`}>
              <MySwitch
                onLabel={"Yes"}
                offLabel={"No"}
                initialValue={strToBool(rssShow)}
                onChange={(value) => setRssShow(value.toString())}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 3,
      form: (
        <Fragment>
          <form className={`col-span-6`}>
            <MyLabel text={"Title Color"} htmlFor={"form-rssTitleColor"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setRssTitleColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setRssTitleColor(rgbaString(color.rgb))
                }
                color={stringToRgba(rssTitleColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 3,
      form: (
        <Fragment>
          <form className={`col-span-6`}>
            <MyLabel text={"Date Color"} htmlFor={"form-rssDateColor"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setRssDateColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setRssDateColor(rgbaString(color.rgb))
                }
                color={stringToRgba(rssDateColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 3,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel
              text={"Background Color"}
              htmlFor={"form-rssBackgroundColor"}
            />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setRssBackgroundColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setRssBackgroundColor(rgbaString(color.rgb))
                }
                color={stringToRgba(rssBackgroundColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 3,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel text={"Active Color"} htmlFor={"form-rssActiveColor"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setRssActiveColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setRssActiveColor(rgbaString(color.rgb))
                }
                color={stringToRgba(rssActiveColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 4,
      form: (
        <Fragment>
          <form
            className={`col-span-full`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const rssFeed = formData.get("rssFeed") as string

              // Update rss feed
              await setRssActive(JSON.parse(rssFeed))

              // Toast it
              await setToastData({
                type: "success",
                text: "Active RSS feed changed!"
              } as ToastData)
            }}>
            <MyLabel text={"Active RSS Feed"} htmlFor={"form-rssFeed"} />
            <div className={`flex items-center gap-2`}>
              <MySelect
                id={"form-rssFeed"}
                name={"rssFeed"}
                options={getRssFeeds(rssFeeds)}
                selectedValue={JSON.stringify(rssActive)}
              />
              <MyButton type={"submit"} text={"Change"} />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 4,
      form: (
        <Fragment>
          <form
            className={`col-span-full`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const addRssFeed = {
                name: formData.get("addRssFeed-name") as string,
                link: formData.get("addRssFeed-link") as string,
                logo: formData.get("addRssFeed-logo") as string
              }

              // Update custom search engines
              rssFeeds.push(addRssFeed)
              await setRssFeeds(rssFeeds)

              // Toast it
              await setToastData({
                type: "success",
                text: "RSS feed added!"
              } as ToastData)
            }}>
            <MyLabel
              text={"Add new RSS Feed"}
              htmlFor={"form-addRssFeed-name"}
            />
            <div className={`flex items-center gap-2`}>
              <MyInput
                type={"text"}
                id={"form-addRssFeed-name"}
                name={"addRssFeed-name"}
                placeholder={"Name"}
              />
              <MyInput
                type={"text"}
                id={"form-addRssFeed-link"}
                name={"addRssFeed-link"}
                placeholder={"Link"}
              />
              <MyInput
                type={"text"}
                id={"form-addRssFeed-logo"}
                name={"addRssFeed-logo"}
                placeholder={"Logo"}
              />
              <MyButton
                type={"submit"}
                text={"Create"}
                bgColor={"bg-green-500"}
                hoverBgColor={"hover:bg-green-600"}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 4,
      form: (
        <Fragment>
          <form
            className={`col-span-full`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const rssFeed: RSSFeed = JSON.parse(
                formData.get("rssFeed") as string
              )

              // Remove the selected rss feed
              const rssFeedsCopy = [...rssFeeds]
              const index = rssFeedsCopy.findIndex(
                (feed) => feed.link === rssFeed.link
              )
              rssFeedsCopy.splice(index, 1)

              // Update rss feed
              await setRssFeeds(rssFeedsCopy)

              // Toast it
              await setToastData({
                type: "success",
                text: "RSS feed removed!"
              } as ToastData)
            }}>
            <MyLabel text={"Remove RSS Feed"} htmlFor={"form-rssFeed-del"} />
            <div className={`flex items-center gap-2`}>
              <MySelect
                id={"form-rssFeed-del"}
                name={"rssFeed"}
                options={getRssFeeds(rssFeeds)}
                selectedValue={JSON.stringify(rssActive)}
              />
              <MyButton
                type={"submit"}
                text={"Remove"}
                bgColor={"bg-red-500"}
                hoverBgColor={"hover:bg-red-600"}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 5,
      form: (
        <Fragment>
          <form
            className={`col-span-full`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const addGroup = {
                id: generateUuidV4(),
                name: formData.get("addGroup-name") as string,
                logo: formData.get("addGroup-logo") as string
              }

              // Update custom search engines
              groups.push(addGroup)
              await setGroups(groups)
              await setActiveGroup(addGroup)

              // Toast it
              await setToastData({
                type: "success",
                text: "Group created!"
              } as ToastData)
            }}>
            <MyLabel text={"Add new Group"} htmlFor={"form-addGroup-name"} />
            <div className={`flex items-center gap-2`}>
              <MyInput
                type={"text"}
                id={"form-addGroup-name"}
                name={"addGroup-name"}
                placeholder={"Name"}
              />
              <MyInput
                type={"text"}
                id={"form-addGroup-logo"}
                name={"addGroup-logo"}
                placeholder={"Logo"}
              />
              <MyButton
                type={"submit"}
                text={"Create"}
                bgColor={"bg-green-500"}
                hoverBgColor={"hover:bg-green-600"}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 5,
      form: (
        <Fragment>
          <form
            className={`col-span-full`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const group: Group = JSON.parse(formData.get("group") as string)

              // Remove the selected rss feed
              const groupsCopy = [...groups]
              const index = groupsCopy.findIndex((g) => g.id === group.id)
              groupsCopy.splice(index, 1)

              // Update rss feed
              await setGroups(groupsCopy)

              // Toast it
              await setToastData({
                type: "success",
                text: "Group removed!"
              } as ToastData)
            }}>
            <MyLabel text={"Remove Group Feed"} htmlFor={"form-group-del"} />
            <div className={`flex items-center gap-2`}>
              <MySelect
                id={"form-group-del"}
                name={"group"}
                options={getGroups(groups)}
              />
              <MyButton
                type={"submit"}
                text={"Remove"}
                bgColor={"bg-red-500"}
                hoverBgColor={"hover:bg-red-600"}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 6,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel text={"Category Background Color"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setCategoryBackgroundColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setCategoryBackgroundColor(rgbaString(color.rgb))
                }
                color={stringToRgba(categoryBackgroundColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 6,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel text={"Category Text Color"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setCategoryTextColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setCategoryTextColor(rgbaString(color.rgb))
                }
                color={stringToRgba(categoryTextColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 6,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel
              text={"Link Card Background Color"}
              htmlFor={"form-group-del"}
            />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setLinkCardBackgroundColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setLinkCardBackgroundColor(rgbaString(color.rgb))
                }
                color={stringToRgba(linkCardBackgroundColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 6,
      form: (
        <Fragment>
          <form className={`col-span-full`}>
            <MyLabel text={"Link Card Text Color"} htmlFor={"form-group-del"} />
            <div className={`flex items-center gap-2`}>
              <ChromePicker
                onChange={(color: ColorPickerEvent) =>
                  setLinkCardTextColorRenderValue(rgbaString(color.rgb))
                }
                onChangeComplete={(color: ColorPickerEvent) =>
                  setLinkCardTextColor(rgbaString(color.rgb))
                }
                color={stringToRgba(linkCardTextColor)}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 7,
      form: (
        <Fragment>
          <form
            className={`col-span-12`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const fontFamily = formData.get("fontFamily") as string

              // Update search engine
              await setFontFamily(fontFamily)

              // Toast it
              await setToastData({
                type: "success",
                text: "Font changed!"
              } as ToastData)
            }}>
            <MyLabel text={"Font Family Name"} htmlFor={"form-fontFamily"} />
            <div className={`flex items-center gap-2`}>
              <MyInput
                type={"text"}
                id={"form-fontFamily"}
                name={"fontFamily"}
                value={fontFamily}
                onChange={(e) => setFontFamilyRenderValue(e.target.value)}
              />
              <MyButton type={"submit"} text={"Change"} />
            </div>
            <InputHelper text={"It should be a valid name from Google Font."} />
            <a
              href={"https://fonts.google.com/"}
              target={"_blank"}
              className={`text-black hover:underline`}>
              https://fonts.google.com/
            </a>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 8,
      form: (
        <Fragment>
          <form
            className={`col-span-12`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const preset: Preset = JSON.parse(
                formData.get("preset") as string
              );

              // Update values
              await applyPreset(preset, {
                setFontFamily,
                setSearchEngineBackgroundColor,
                setSearchEngineTextColor,
                setSearchEnginePlaceholderColor,
                setBackground,
                setClockStyle,
                setClockShowSeconds,
                setClockColor,
                setClockShadowColor,
                setRssShow,
                setRssTitleColor,
                setRssDateColor,
                setRssBackgroundColor,
                setRssActiveColor,
                setLinkCardTextColor,
                setLinkCardBackgroundColor,
                setCategoryBackgroundColor,
                setCategoryTextColor,
              });

              // Toast it
              await setToastData({
                type: "success",
                text: "Preset loaded!"
              } as ToastData)
            }}>
            <MyLabel text={"Load Preset"} htmlFor={"form-preset"} />
            <div className={`flex items-center gap-2`}>
              <MySelect
                id={"form-preset"}
                name={"preset"}
                options={getPresets(presets)}
              />
              <MyButton type={"submit"} text={"Load"} />
            </div>
            <InputHelper
              text={
                "This will only load the preset. If you modify it you'll need to remove the previous preset and create a new one."
              }
            />
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 8,
      form: (
        <Fragment>
          <form
            className={`col-span-12`}
            onSubmit={async (e) => {
              e.preventDefault()

              const formData = new FormData(e.target as HTMLFormElement)
              const exportName = formData.get("create-name") as string

              // Get data
              const preset = buildPreset(exportName, {
                fontFamily,
                searchEngineBackgroundColor,
                searchEngineTextColor,
                searchEnginePlaceholderColor,
                background,
                clockStyle,
                clockShowSeconds,
                clockColor,
                clockShadowColor,
                rssShow,
                rssTitleColor,
                rssDateColor,
                rssBackgroundColor,
                rssActiveColor,
                linkCardTextColor,
                linkCardBackgroundColor,
                categoryBackgroundColor,
                categoryTextColor,
              });

              presets.push(preset);
              await setPresets(presets);

              // Toast it
              await setToastData({
                type: "success",
                text: "Preset created!"
              } as ToastData)
            }}>
            <MyLabel text={"Save Preset"} htmlFor={"form-create"} />
            <div className={`flex items-center gap-2`}>
              <MyInput
                type={"text"}
                id={"form-create-name"}
                name={"create-name"}
                placeholder={"Name"}
              />
              <MyButton
                type={"submit"}
                text={"Create"}
                bgColor={"bg-green-500"}
                hoverBgColor={"hover:bg-green-600"}
              />
            </div>
            <InputHelper text={"This will save actual values."} />
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 8,
      form: (
        <Fragment>
          <form
            className={`col-span-12`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const preset: Preset = JSON.parse(
                formData.get("preset") as string
              )

              // Remove the selected rss feed
              const presetsCopy = [...presets]
              const index = presetsCopy.findIndex((p) => p.id === preset.id)
              presetsCopy.splice(index, 1)

              // Update rss feed
              await setPresets(presetsCopy)

              // Toast it
              await setToastData({
                type: "success",
                text: "Preset removed!"
              } as ToastData)
            }}>
            <MyLabel text={"Remove Preset"} htmlFor={"form-preset-del"} />
            <div className={`flex items-center gap-2`}>
              <MySelect
                id={"form-preset-del"}
                name={"preset"}
                options={getPresets(presets)}
              />
              <MyButton
                type={"submit"}
                text={"Remove"}
                bgColor={"bg-red-500"}
                hoverBgColor={"hover:bg-red-600"}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 8,
      form: (
        <Fragment>
          <form
            className={`col-span-12`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const preset: Preset = JSON.parse(
                formData.get("preset") as string
              )

              const presetJson = JSON.stringify(preset, null, 2)

              // Create a temporary element for copying
              const tempTextarea = document.createElement("textarea")
              tempTextarea.value = presetJson
              document.body.appendChild(tempTextarea)
              tempTextarea.select()

              try {
                document.execCommand("copy")
                await setToastData({
                  type: "export",
                  text: "Preset copied!"
                } as ToastData)

                // Also offer download
                const blob = new Blob([presetJson], {
                  type: "application/json"
                })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `${preset.name.replace(/\s+/g, "-").toLowerCase()}.json`
                document.body.appendChild(a)
                a.click()

                // Clean up
                setTimeout(() => {
                  URL.revokeObjectURL(url)
                  document.body.removeChild(a)
                }, 0)
              } catch (err) {
                await setToastData({
                  type: "error",
                  text: "An error occurred.."
                } as ToastData)
              } finally {
                document.body.removeChild(tempTextarea)
              }
            }}>
            <MyLabel text={"Export Preset"} htmlFor={"form-preset-exp"} />
            <div className={`flex items-center gap-2`}>
              <MySelect
                id={"form-preset-exp"}
                name={"preset"}
                options={getPresets(presets)}
              />
              <MyButton
                type={"submit"}
                text={"Export"}
                bgColor={"bg-purple-500"}
                hoverBgColor={"hover:bg-purple-600"}
              />
            </div>
          </form>
        </Fragment>
      )
    },
    {
      tabIndex: 8,
      form: (
        <Fragment>
          <form
            className={`col-span-12`}
            onSubmit={async (e) => {
              e.preventDefault()

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement)
              const presetData = formData.get("import-preset-data") as string;
              const presetFile = formData.get("import-preset-file") as File;

              try {
                let preset: Preset;

                if (presetFile.name) {
                  // Process the file
                  const imported = (await readFileAsJson(presetFile)) as Omit<Preset, "id">;
                  preset = {
                    ...imported,
                    id: generateUuidV4(),
                  };
                } else {
                  // Process the textarea input
                  const importData = presetData.replaceAll("\n", "").trim();
                  if (!importData) {
                    return;
                  }

                  const imported = JSON.parse(importData) as Omit<Preset, "id">;
                  preset = {
                    ...imported,
                    id: generateUuidV4(),
                  };
                }

                presets.push(preset);
                await setPresets(presets);

                await applyPreset(preset, {
                  setFontFamily,
                  setSearchEngineBackgroundColor,
                  setSearchEngineTextColor,
                  setSearchEnginePlaceholderColor,
                  setBackground,
                  setClockStyle,
                  setClockShowSeconds,
                  setClockColor,
                  setClockShadowColor,
                  setRssShow,
                  setRssTitleColor,
                  setRssDateColor,
                  setRssBackgroundColor,
                  setRssActiveColor,
                  setLinkCardTextColor,
                  setLinkCardBackgroundColor,
                  setCategoryBackgroundColor,
                  setCategoryTextColor,
                });

                await setToastData({
                  type: "export",
                  text: "Preset imported!"
                } as ToastData)

              } catch (err) {
                await setToastData({
                  type: "error",
                  text: "An error occurred.."
                } as ToastData)
              }
            }}>
            <MyLabel text={"Import Preset"} htmlFor={"form-preset-exp"} />
            <div className={`flex items-center flex-col gap-2 w-full`}>
              <div className={`flex items-center gap-2 w-full`}>
                <div className={`flex-1`}>
                  <MyTextarea
                    name="import-preset-data"
                    placeholder="Paste preset JSON data here"
                    rows={3}
                  />
                </div>
                <VerticalSeparator width="2px" height={"50px"} />
                <div className="flex-1">
                  <MyLabel text={"Or select a JSON file:"} htmlFor={"import-preset-file"} size={"xs"} />
                  <MyInput type={"file"} name={"import-preset-file"} accept={".json"} />
                </div>
              </div>
              <MyButton
                type={"submit"}
                text={"Import"}
                bgColor={"bg-purple-500"}
                hoverBgColor={"hover:bg-purple-600"}
              />
            </div>
          </form>
        </Fragment>
      )
    }
  ]
}