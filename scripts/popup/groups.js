import { getStorageData, setStorageData, GROUPS_KEY, ACTIVE_GROUP_KEY, LINKS_KEY } from '../storage.js';
import { sendMessageToActiveTab, showNotification } from './helpers.js';

async function getCurrentLinksSnapshot() {
  const groups = await getStorageData(GROUPS_KEY) || {};
  const active = await getStorageData(ACTIVE_GROUP_KEY);
  if (active && groups[active] && groups[active].links) {
    return groups[active].links;
  }
  // fallback to legacy links
  const legacyLinks = await getStorageData(LINKS_KEY) || {};
  return legacyLinks;
}

async function populateGroupsSelect() {
  const select = document.getElementById('groups-manage-select');
  const setActiveBtn = document.getElementById('btn-set-active-group');
  if (!select) return;
  // clear
  while (select.firstChild) select.removeChild(select.firstChild);
  const groups = await getStorageData(GROUPS_KEY) || {};
  const active = await getStorageData(ACTIVE_GROUP_KEY);
  const names = Object.keys(groups);
  if (names.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'No groups';
    select.appendChild(opt);
    select.disabled = true;
    if (setActiveBtn) setActiveBtn.disabled = true;
    return;
  }
  select.disabled = false;
  if (setActiveBtn) setActiveBtn.disabled = false;
  names.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name + (name === active ? ' (active)' : '');
    if (name === active) opt.selected = true;
    select.appendChild(opt);
  });
}

export async function initGroupsManager() {
  await populateGroupsSelect();

  const createBtn = document.getElementById('btn-create-group');
  const updateBtn = document.getElementById('btn-update-group');
  const deleteBtn = document.getElementById('btn-delete-group');
  const setActiveBtn = document.getElementById('btn-set-active-group');
  const nameInput = document.getElementById('input-group-name');
  const select = document.getElementById('groups-manage-select');
  const groupSection = document.getElementById('groups-manage');

  if (!groupSection) return;

  if (createBtn) {
    createBtn.onclick = async (e) => {
      e.preventDefault();
      const name = (nameInput?.value || '').trim();
      if (!name) {
        showNotification('Please enter a group name.', groupSection, true);
        return;
      }
      const groups = await getStorageData(GROUPS_KEY) || {};
      if (groups[name]) {
        showNotification('A group with this name already exists.', groupSection, true);
        return;
      }
      const snapshot = await getCurrentLinksSnapshot();
      groups[name] = { links: snapshot };
      await setStorageData(groups, GROUPS_KEY);
      // set as active as well
      await setStorageData(name, ACTIVE_GROUP_KEY);
      await populateGroupsSelect();
      nameInput.value = '';
      showNotification(`Group "${name}" created from current links and set active.`, groupSection);
      // ask main page to refresh if open
      sendMessageToActiveTab('reload');
    };
  }

  if (updateBtn) {
    updateBtn.onclick = async (e) => {
      e.preventDefault();
      const selected = select?.value || '';
      if (!selected) return;
      const groups = await getStorageData(GROUPS_KEY) || {};
      if (!groups[selected]) return;
      const snapshot = await getCurrentLinksSnapshot();
      groups[selected] = { ...(groups[selected] || {}), links: snapshot };
      await setStorageData(groups, GROUPS_KEY);
      showNotification(`Group "${selected}" updated from current links.`, groupSection);
      sendMessageToActiveTab('reload');
    };
  }

  if (setActiveBtn) {
    setActiveBtn.onclick = async (e) => {
      e.preventDefault();
      const selected = select?.value || '';
      if (!selected) return;
      await setStorageData(selected, ACTIVE_GROUP_KEY);
      await populateGroupsSelect();
      showNotification(`Active group set to "${selected}".`, groupSection);
      sendMessageToActiveTab('reload');
    };
  }

  if (deleteBtn) {
    deleteBtn.onclick = async (e) => {
      e.preventDefault();
      const selected = select?.value || '';
      if (!selected) return;
      const groups = await getStorageData(GROUPS_KEY) || {};
      const active = await getStorageData(ACTIVE_GROUP_KEY);
      if (!groups[selected]) return;
      delete groups[selected];
      await setStorageData(groups, GROUPS_KEY);
      if (active === selected) {
        // pick another group if available, else clear active
        const names = Object.keys(groups);
        const next = names[0] || '';
        await setStorageData(next, ACTIVE_GROUP_KEY);
      }
      await populateGroupsSelect();
      showNotification(`Group "${selected}" deleted.`, groupSection);
      sendMessageToActiveTab('reload');
    };
  }
}
