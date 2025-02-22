// ui-components.js - UI component creation functions

/**
 * Create a link card element
 * @param {Object} item - Link item data
 * @returns {HTMLElement} - Link card element
 */
export function createLinkCard(item) {
  const card = document.createElement("div");
  card.classList.add("link-card");
  card.innerHTML = `
    <a href="${item.link}">
      <div class="delete-item" data-item-text="${item.text}">✖</div>
      <img src="${item.img || 'default-icon.png'}" alt="${item.text}" />
      <p>${item.text}</p>
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