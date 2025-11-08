import {useStorage} from "@plasmohq/storage/hook";
import {
  ACTIVE_RSS_FEED,
  RSS_ACTIVE_COLOR,
  RSS_BG_COLOR,
  RSS_DATE_COLOR,
  RSS_ENABLE,
  RSS_FEEDS,
  RSS_TITLE_COLOR
} from "~scripts/storage"
import {type RSSFeed} from '~scripts/popup/settingsConfig'
import React, { Fragment, useEffect, useState } from "react"
import { strToBool } from "~lib/helpers";
import Color from "color";
import {
  RSS_ACTIVE_COLOR__DEFAULT,
  RSS_BG_COLOR__DEFAULT,
  RSS_DATE_COLOR__DEFAULT,
  RSS_TITLE_COLOR__DEFAULT
} from "~scripts/defaultValues"

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
}

export function RSSFeed() {
  const [rssShow] = useStorage(RSS_ENABLE, "true");
  const [rssTitleColor] = useStorage(RSS_TITLE_COLOR, RSS_TITLE_COLOR__DEFAULT);
  const [rssDateColor] = useStorage(RSS_DATE_COLOR, RSS_DATE_COLOR__DEFAULT);
  const [rssBackgroundColor] = useStorage(RSS_BG_COLOR, RSS_BG_COLOR__DEFAULT);
  const [rssActiveColor] = useStorage(RSS_ACTIVE_COLOR, RSS_ACTIVE_COLOR__DEFAULT);
  const [rssActive] = useStorage(ACTIVE_RSS_FEED, {} as RSSFeed);
  const [rssFeeds] = useStorage(RSS_FEEDS, [] as RSSFeed[]);

  const [selectedFeed, setSelectedFeed] = useState<RSSFeed>(rssActive);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    setSelectedFeed(rssActive);
  }, [rssActive]);

  useEffect(() => {
    const loadFeed = async () => {
      // Fetch the RSS feed
      if (!selectedFeed.link) {
        return;
      }

      const response = await fetch(selectedFeed.link);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      if (!data || data.trim() === '') {
        throw new Error('Empty response received from RSS feed');
      }

      // Parse the XML
      const xml = new DOMParser().parseFromString(data, "text/xml");
      if (xml.querySelector('parsererror')) {
        throw new Error('Invalid XML received from RSS feed');
      }

      // Get the image and items
      const items = xml.querySelectorAll("item");

      const feedItems: FeedItem[] = [];
      items.forEach((item) => {
        const title = item.querySelector("title")?.textContent;
        const link = item.querySelector("link")?.textContent;
        const pubDate = item.querySelector("pubDate")?.textContent;
        if (title && link && pubDate) {
          feedItems.push({ title, link, pubDate });
        }
      });

      setFeedItems(feedItems);
    };
    loadFeed();
  }, [selectedFeed]);

  const getTextColor = (bgColor: string) => {
    const color = Color(bgColor);
    return color.isLight() ? "#000000" : "#ffffff";
  }

  return (
    <Fragment>
      {strToBool(rssShow) && (
        <div className="w-3/4 flex flex-col items-start justify-center">
          <div className="flex gap-2 mb-4">
            {rssFeeds.map((feed) => (
              <div
                key={feed.link}
                className={`cursor-pointer p-2 rounded`}
                style={{
                  backgroundColor: selectedFeed.link === feed.link ? rssActiveColor : rssBackgroundColor,
                  color: selectedFeed.link === feed.link ? getTextColor(rssActiveColor) : getTextColor(rssBackgroundColor)
                }}
                onClick={() => setSelectedFeed(feed)}
              >
                {feed.logo && (
                  <img
                    src={feed.logo}
                    alt={feed.name}
                    className="w-4 h-4 inline mr-2"
                  />
                )}
                {feed.name}
              </div>
            ))}
          </div>
          <div id="rss" className="space-y-2 h-[70vh] overflow-y-auto pr-4" style={{
            "--rss-bg-color": rssBackgroundColor,
            "--rss-title-color": rssTitleColor,
          } as React.CSSProperties}>
            {feedItems?.map((item) => (
              <a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 hover:bg-gray-100 rounded hover:shadow-lg hover:ring-4 ring-0 ring-inset transition-all duration-300"
                style={{ backgroundColor: rssBackgroundColor, "--tw-ring-color": rssActiveColor } as React.CSSProperties}
              >
                <div className={`text-lg font-semibold`} style={{ color: rssTitleColor }}>{item.title}</div>
                <div className={`text-md italic`} style={{ color: rssDateColor }}>
                  {new Date(item.pubDate).toLocaleDateString()}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  )
}