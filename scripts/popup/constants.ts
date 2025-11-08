export const defaultSearchEngines = [
  {
    value: JSON.stringify({
      name: "Google",
      link: "https://www.google.fr/search?q=%input%",
      logo: "https://www.google.com/favicon.ico",
    }),
    label: "Google",
  },
  {
    value: JSON.stringify({
      name: "DuckDuckGo",
      link: "https://duckduckgo.com/?q=%input%",
      logo: "https://duckduckgo.com/favicon.ico",
    }),
    label: "DuckDuckGo",
  },
  {
    value: JSON.stringify({
      name: "Bing",
      link: "https://www.bing.com/search?q=%input%",
      logo: "https://www.bing.com/favicon.ico",
    }),
    label: "Bing",
  },
  {
    value: JSON.stringify({
      name: "Yahoo",
      link: "https://search.yahoo.com/search?p=%input%",
      logo: "https://www.yahoo.com/favicon.ico",
    }),
    label: "Yahoo",
  },
  {
    value: JSON.stringify({
      name: "Ecosia",
      link: "https://www.ecosia.org/search?q=%input%",
      logo: "https://www.ecosia.org/favicon.ico",
    }),
    label: "Ecosia",
  },
  {
    value: JSON.stringify({
      name: "Qwant",
      link: "https://www.qwant.com/?q=test%input%",
      logo: "https://www.qwant.com/favicon.ico",
    }),
    label: "Qwant",
  },
  {
    value: JSON.stringify({
      name: "Brave Search",
      link: "https://search.brave.com/search?q=%input%",
      logo: "https://cdn.search.brave.com/serp/v2/_app/immutable/assets/brave-logo-dark.Bg87GL4b.svg",
    }),
    label: "Brave Search",
  },
];
