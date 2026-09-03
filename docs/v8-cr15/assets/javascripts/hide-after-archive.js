// Hide archive versions after the "Archive" entry unless the current page belongs to one of them.
(function () {
  'use strict';

  function normalizePath(path) {
    return path.replace(/\/+$|^\/+/g, '').toLowerCase();
  }

  function isCurrentVersionLink(linkUrl, currentUrl) {
    const linkPath = normalizePath(linkUrl.pathname);
    const currentPath = normalizePath(currentUrl.pathname);
    return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
  }

  function hideAfterArchive() {
    const list = document.querySelector('.md-version__list');
    if (!list) return;

    const currentUrl = new URL(window.location.href);
    const items = Array.from(list.querySelectorAll('.md-version__item'));
    let archiveFound = false;

    items.forEach((li) => {
      if (!archiveFound) {
        const text = li.textContent.trim();
        if (/\bArchive\b/i.test(text)) {
          archiveFound = true;
        }
        li.style.display = '';
        return;
      }

      const a = li.querySelector('a.md-version__link, a');
      if (!a) {
        li.style.display = 'none';
        return;
      }

      const href = a.getAttribute('href');
      if (!href) {
        li.style.display = 'none';
        return;
      }

      try {
        const linkUrl = new URL(href, document.baseURI);
        if (isCurrentVersionLink(linkUrl, currentUrl)) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      } catch (e) {
        li.style.display = 'none';
      }
    });
  }

  hideAfterArchive();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideAfterArchive);
  }

  const observer = new MutationObserver(hideAfterArchive);
  observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
