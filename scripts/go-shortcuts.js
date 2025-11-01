const extGoId = "kbpkgjiamlggepaphkhbmigkhejkkdbn";

export function getGoShortcuts() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(extGoId, {action: "getShortcuts"},
      (response) => {
        resolve(response?.shortcuts?.entries || null)
      }
    );
  });
}