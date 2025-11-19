const extGoId = "kbpkgjiamlggepaphkhbmigkhejkkdbn"; // Prod
// const extGoId = "iclldljopgnfmmeibicacablgcfkaddj"; // Dev

export interface Shortcuts {
  [key: string]: string;
}

export function getGoShortcuts(): Promise<Shortcuts | null> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      extGoId,
      { action: "getShortcuts" },
      (response) => {
        resolve((response?.shortcuts?.entries as Shortcuts) || null);
      },
    );
  });
}
