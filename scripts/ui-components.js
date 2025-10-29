// ui-components.js - UI component creation functions

import { getStorageData, SEARCH_ENGINE } from "./storage.js";

/**
 * Create a link card element
 * @param {Object} item - Link item data
 * @returns {HTMLElement} - Link card element
 */
export async function updateSearchInput() {
  const searchEngine = await getStorageData(SEARCH_ENGINE);

  if (!searchEngine) {
    return;
  }

  let parsedEngine;
  try {
    parsedEngine = JSON.parse(searchEngine);
  } catch (e) {
    parsedEngine = searchEngine;
  }

  const input = document.querySelector("#search");
  input.placeholder = `Search with ${parsedEngine.name}`;

  const inputImage = document.querySelector("#search-img");
  inputImage.src = parsedEngine.logo;
}

export function setupEnterListener() {
  const searchInput = document.querySelector("#search");
  setTimeout(() => {
    searchInput.focus();
  }, 500);

  window.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const searchInput = document.querySelector("#search");
      if (searchInput.value !== "") {
        const searchEngine = await getStorageData(SEARCH_ENGINE);
        const parsedEngine = JSON.parse(searchEngine);
        const inputValue = searchInput.value
          .replaceAll(" ", "+");
        const link = parsedEngine.link.replace("%input%", inputValue);
        window.location.href = link;
      }
    }
  });
}

/**
 * Create a link card element
 * @param {Object} item - Link item data
 * @returns {HTMLElement} - Link card element
 */
export function createLinkCard(item) {
  const card = document.createElement("div");
  card.classList.add("link-card");
  card.setAttribute("draggable", "true");
  card.setAttribute("data-item-uid", item.uid);
  card.innerHTML = `
    <a href="${item.link}">
      <span class="category-uid" style="display: none;">${item.uid}</span>
      <div class="delete-item" data-item-uid="${item.uid}">✖</div>
      <img src="${item.img}" alt="${item.text}" />
      ${item.hideTitle ? `<p style="display: none;">${item.text}</p>` : `<p>${item.text}</p>`}
    </a>
  `;
  return card;
}

/**
 * Create an "add link" button for a category
 * @param {string} category - Category name
 * @returns {HTMLElement} - Add button element
 */
export function createAddButton(category) {
  const addButton = document.createElement("div");
  addButton.classList.add("link-card", "link-card--add");
  addButton.setAttribute("data-category", category);
  addButton.innerHTML = `<a><p>✚</p></a>`;
  return addButton;
}

setTimeout(() => {
  const addLinkDialog = document.querySelector("#add-dialog");
  const addCategoryDialog = document.querySelector("#add-cat-dialog");

  addLinkDialog.addEventListener("click", (e) => {
    if (e.target === addLinkDialog) {
      addLinkDialog.close();
    }
  })
  addCategoryDialog.addEventListener("click", (e) => {
    if (e.target === addCategoryDialog) {
      addCategoryDialog.close();
    }
  })
})

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "searchEngineChanged" ) {
        updateSearchInput();
      }
    }
  );
}, 1000)