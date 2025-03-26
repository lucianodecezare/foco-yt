document.addEventListener('DOMContentLoaded', () => {
  const toggle: HTMLInputElement = document.getElementById('extensionToggle') as HTMLInputElement;

  chrome.storage.sync.get(['isExtensionEnabled'], (result) => {
    toggle.checked = result.isExtensionEnabled;
  });

  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({
      isExtensionEnabled: toggle.checked
    }, () => {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              action: 'toggleExtension',
              isEnabled: toggle.checked
            });
          }
        });
      });
    });
  });
});