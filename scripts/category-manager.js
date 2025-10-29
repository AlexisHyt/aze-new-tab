// category-manager.js - Category and link management
// 
// This file handles the management of categories and links, including:
// - Loading and displaying categories and links
// - Adding and deleting categories and links
// - Drag and drop functionality to move links between categories

import {getStorageData, setStorageData, LINKS_KEY} from './storage.js';
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
    const itemsCategories = await getStorageData(LINKS_KEY);
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

  // Add drag and drop listeners
  addDragAndDropListeners();
}

/**
 * Add drag and drop event listeners
 */
function addDragAndDropListeners() {
  // Add drag listeners to link cards
  document.querySelectorAll(".link-card:not(.link-card--add)").forEach(card => {
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  });

  // Add drag listeners to category containers
  document.querySelectorAll(".category").forEach(category => {
    category.addEventListener("dragover", handleDragOver);
    category.addEventListener("dragleave", handleDragLeave);
    category.addEventListener("drop", handleDrop);
  });
}

/**
 * Handle drag start event
 * @param {DragEvent} event - Drag event
 */
function handleDragStart(event) {
  // Store the link's UID and find its category
  const linkCard = event.currentTarget;
  const linkUid = linkCard.getAttribute("data-item-uid");
  const categoryEl = linkCard.closest('.category');
  const categoryTitleEl = categoryEl.previousElementSibling;
  const categoryName = categoryTitleEl.textContent.trim().replaceAll('✖', '');
  
  // Add dragging class for visual feedback
  linkCard.classList.add('dragging');
  
  // Store data in the dataTransfer object
  event.dataTransfer.setData("text/plain", JSON.stringify({
    linkUid: linkUid,
    sourceCategory: categoryName
  }));
  
  // Set the drag effect
  event.dataTransfer.effectAllowed = "move";
}

/**
 * Handle drag end event
 * @param {DragEvent} event - Drag event
 */
function handleDragEnd(event) {
  // Remove dragging class
  event.currentTarget.classList.remove('dragging');
  
  // Remove drag-over class from all categories
  document.querySelectorAll('.category').forEach(category => {
    category.classList.remove('drag-over');
  });
}

/**
 * Handle drag over event
 * @param {DragEvent} event - Drag event
 */
function handleDragOver(event) {
  // Prevent default to allow drop
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  
  // Add drag-over class for visual feedback
  event.currentTarget.querySelector('.link-card--add').classList.add('drag-over');
}

/**
 * Handle drag leave event
 * @param {DragEvent} event - Drag event
 */
function handleDragLeave(event) {
  // Remove drag-over class
  event.currentTarget.querySelector('.link-card--add').classList.remove('drag-over');
}

/**
 * Handle drop event
 * @param {DragEvent} event - Drop event
 */
async function handleDrop(event) {
  event.preventDefault();
  
  // Remove drag-over class
  event.currentTarget.classList.remove('drag-over');
  
  // Get the data from the dataTransfer object
  const data = JSON.parse(event.dataTransfer.getData("text/plain"));
  const linkUid = data.linkUid;
  const sourceCategory = data.sourceCategory;
  
  // Get the target category
  const targetCategoryEl = event.currentTarget;
  const targetCategoryTitleEl = targetCategoryEl.previousElementSibling;
  const targetCategory = targetCategoryTitleEl.textContent.trim().replaceAll('✖', '');
  
  // Don't do anything if dropping in the same category
  if (sourceCategory === targetCategory) {
    return;
  }
  
  try {
    // Get the current links data
    const links = await getStorageData(LINKS_KEY);
    
    // Find the link in the source category
    const linkItem = links[sourceCategory].find(item => item.uid === linkUid);
    
    if (linkItem) {
      // Remove the link from the source category
      links[sourceCategory] = links[sourceCategory].filter(item => item.uid !== linkUid);
      
      // Add the link to the target category
      if (!links[targetCategory]) {
        links[targetCategory] = [];
      }
      links[targetCategory].push(linkItem);
      
      // Update storage and refresh the UI
      await setStorageData(links, LINKS_KEY);
      await getCategories();
    }
  } catch (error) {
    console.error("Error moving link:", error);
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

      const links = await getStorageData(LINKS_KEY);
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

      await setStorageData(links, LINKS_KEY);
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
      const links = await getStorageData(LINKS_KEY);
      if (links[categoryName]) {
        links[categoryName] = links[categoryName].filter(item => item.uid !== itemUid);
        await setStorageData(links, LINKS_KEY);
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
      const links = await getStorageData(LINKS_KEY);
      if (!links[name]) {
        links[name] = [];
        await setStorageData(links, LINKS_KEY);
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
      const links = await getStorageData(LINKS_KEY);
      if (links[categoryName]) {
        delete links[categoryName];
        await setStorageData(links, LINKS_KEY);
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