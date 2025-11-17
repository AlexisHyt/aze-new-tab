function extractDomain(url: string) {
  const hostname = new URL(url).hostname;
  if (hostname.split(".").length > 2) {
    return hostname.split(".").slice(-2).join(".");
  }
  return hostname;
}

export async function getFaviconFromUrl(url: string) {
  return `https://www.google.com/s2/favicons?domain=${extractDomain(url)}&sz=256`;
}
