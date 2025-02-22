chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getFavicon") {
    try {
      const domain = new URL(request.url).origin;
      const faviconUrl = `${domain}/favicon.ico`; // Directly fetch the favicon

      sendResponse({ favicon: faviconUrl });
    } catch (error) {
      console.error("Error processing URL:", error);
      sendResponse({ favicon: null });
    }
  }
  return true; // Required for async sendResponse
});