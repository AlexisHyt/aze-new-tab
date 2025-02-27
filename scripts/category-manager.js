// category-manager.js - Category and link management

import {getStorageData, setStorageData, STORAGE_KEY} from './storage.js';
import { createLinkCard, createAddButton } from './ui-components.js';

/**
 * Fetch favicon for a URL
 * @param {string} url - URL to fetch favicon for
 * @returns {Promise<string>} - Favicon URL
 */
export function getFavicon(url) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getFavicon", url: url }, response => {
      resolve(response?.favicon || null);
    });
  });
}

/**
 * Load and display categories
 */
export async function getCategories() {
  try {
    const itemsCategories = await getStorageData(STORAGE_KEY);
    const container = document.getElementById("categories-link");
    if (!container) return;

    container.innerHTML = "";

    Object.entries(itemsCategories).forEach(([title, items]) => {
      // Create category title
      const titleElement = document.createElement("p");
      titleElement.classList.add("category-title");
      titleElement.textContent = title;

      const categoryDelete = document.createElement("div");
      categoryDelete.classList.add("category-delete");
      categoryDelete.setAttribute("data-category", title);
      categoryDelete.textContent = '✖';

      titleElement.append(categoryDelete);

      container.appendChild(titleElement);

      // Create category container
      const category = document.createElement("div");
      category.classList.add("category");

      // Add items to category
      items.forEach((item) => {
        category.appendChild(createLinkCard(item));
      });

      // Add the "add new" button
      category.appendChild(createAddButton(title));
      container.appendChild(category);
    });

    // Add event listeners after creating elements
    addEventListeners();
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

/**
 * Add event listeners to interactive elements
 */
function addEventListeners() {
  // Add listeners for "add link" buttons
  document.querySelectorAll(".link-card--add").forEach(button => {
    button.addEventListener("click", handleAddLink);
  });

  // Add listeners for delete buttons
  document.querySelectorAll(".delete-item").forEach(button => {
    button.addEventListener("click", handleDeleteItem);
  });

  // Add listeners for delete category buttons
  document.querySelectorAll(".category-delete").forEach(button => {
    button.addEventListener("click", handleDeleteCategory);
  });

  // Add listener for creating new category
  const addCategoryBtn = document.getElementById("create-category");
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener("click", handleAddCategory);
  }
}

/**
 * Handle adding a new link
 * @param {Event} event - Click event
 */
async function handleAddLink(event) {
  const uid = guidGenerator();
  const category = event.currentTarget.getAttribute("data-category");
  const dialog = document.getElementById("add-dialog");
  const form = document.getElementById("add-form");
  const titleInput = form.querySelector("#title");
  const urlInput = form.querySelector("#url");
  const imageInput = form.querySelector("#image");
  const hideTitleInput = form.querySelector("#hideTitle");

  // Show dialog
  dialog.showModal();

  form.onsubmit = async (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    let image = imageInput.value.trim();
    const hideTitle = !!hideTitleInput.checked;

    if (!title || !url) return;

    try {
      if (!image) {
        image = await getFavicon(url);
      }

      const links = await getStorageData(STORAGE_KEY);
      if (!links[category]) {
        links[category] = [];
      }

      links[category].push({
        uid: uid,
        img: image,
        link: url,
        text: title,
        hideTitle: hideTitle,
      });

      await setStorageData(links, STORAGE_KEY);
      await getCategories();
      dialog.close();
      form.reset();
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  // Close button event
  document.getElementById("close-dialog").addEventListener("click", () => {
    dialog.close();
    form.reset();
  }, { once: true });
}

/**
 * Handle deleting an item
 * @param {Event} event - Click event
 */
async function handleDeleteItem(event) {
  event.preventDefault();
  event.stopPropagation();

  const itemUid = event.currentTarget.getAttribute("data-item-uid");
  const categoryEl = event.currentTarget.closest('.category');
  const categoryTitleEl = categoryEl.previousElementSibling;

  if (categoryTitleEl && categoryTitleEl.classList.contains('category-title')) {
    const categoryName = categoryTitleEl.textContent.trim().replaceAll('✖', '');

    try {
      const links = await getStorageData(STORAGE_KEY);
      if (links[categoryName]) {
        links[categoryName] = links[categoryName].filter(item => item.uid !== itemUid);
        await setStorageData(links, STORAGE_KEY);
        await getCategories();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
}

/**
 * Handle adding a new category
 */
export async function handleAddCategory() {
  const dialog = document.getElementById("add-cat-dialog");
  const form = document.getElementById("add-cat-form");
  const titleInput = document.getElementById("cat-title");

  dialog.showModal();

  form.onsubmit = async (e) => {
    e.preventDefault();
    const name = titleInput.value.trim();
    if (!name) return;

    try {
      const links = await getStorageData(STORAGE_KEY);
      if (!links[name]) {
        links[name] = [];
        await setStorageData(links, STORAGE_KEY);
        await getCategories();
      } else {
        alert("Category already exists");
      }
      dialog.close();
      form.reset();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  document.getElementById("close-cat-dialog").addEventListener("click", () => {
    dialog.close();
    form.reset();
  }, { once: true });
}

/**
 * Handle deleting a category
 * @param {Event} event - Click event
 */
async function handleDeleteCategory(event) {
  event.preventDefault();
  event.stopPropagation();

  const categoryTitleEl = event.currentTarget.closest('.category-title');
  if (categoryTitleEl) {
    const categoryName = categoryTitleEl.textContent.replaceAll('✖', '').trim();
    try {
      const links = await getStorageData(STORAGE_KEY);
      if (links[categoryName]) {
        delete links[categoryName];
        await setStorageData(links, STORAGE_KEY);
        await getCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
}

function guidGenerator() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

setTimeout(() => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "cardLinkShowTitleChanged" ) {
        getCategories();
      }
    }
  );
}, 1000)