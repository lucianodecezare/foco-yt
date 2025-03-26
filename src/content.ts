type Style = HTMLElement | null
const APP_NAME = 'foco-yt'

const applyFocusMode = (): void => {
  chrome.storage.sync.get(['isExtensionEnabled'], (result) => {
    if (result.isExtensionEnabled) {
      const currentPath: string = window.location.pathname;
      const cssRules: { [key: string]: string } = {
        '/': `
          div#content ytd-page-manager#page-manager { display: none; }
          tp-yt-app-drawer div#sections>ytd-guide-section-renderer:not(:nth-child(1)) { display: none; }
          tp-yt-app-drawer div#sections div#header { display: none; }
          tp-yt-app-drawer div#footer { display: none; }
          #items>ytd-guide-entry-renderer:nth-child(1) { display: none; }
          #items>ytd-guide-entry-renderer:nth-child(2) { display: none; }
          #section-items>ytd-guide-entry-renderer:nth-child(3) { display: none; }
          #section-items>ytd-guide-entry-renderer:nth-child(5) { display: none; }
        `,
        '/watch': `
          div#secondary { display: none; }
          ytd-comments#comments { display: none; }
          div[slot="extra-content"] { display: none; }
          div#teaser-carousel { display: none; }
        `
      };
      const styleToApply: string = cssRules[currentPath] || cssRules['/default'];
      const existingStyle: Style = document.getElementById(APP_NAME);

      if (existingStyle) {
        existingStyle.textContent = styleToApply;
      } else {
        const styleElement: HTMLStyleElement = document.createElement('style');

        styleElement.id = APP_NAME;
        styleElement.textContent = styleToApply;

        document.head.appendChild(styleElement);
      }
    } else {
      const existingStyle: Style = document.getElementById(APP_NAME);

      if (existingStyle) {
        existingStyle.remove();
      }
    }
  });
}

applyFocusMode();

window.addEventListener('popstate', applyFocusMode);