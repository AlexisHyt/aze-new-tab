// Function to send a message to the active tab
export const sendMessageToActiveTab = (message) => {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": message});
  });
};
// Show notification message
export const showNotification = (message, parentElement, isError = false) => {
  const notificationDiv = document.createElement('div');
  notificationDiv.classList.add(isError ? "div-error" : "div-success");
  notificationDiv.textContent = message;

  // Find where to display the notification
  const targetElement = parentElement || document.querySelector('.presets-group');
  if (targetElement) {
    targetElement.prepend(notificationDiv);
  }

  setTimeout(() => {
    notificationDiv.remove();
  }, 3000);
};
// Read a file as JSON
export const readFileAsJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        resolve(json);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsText(file);
  });
};