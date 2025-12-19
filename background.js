chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  try {
    // Query all tabs in the current window
    const tabs = await chrome.tabs.query({ currentWindow: true });

    // Find the index of the current tab
    const currentIndex = tabs.findIndex(t => t.id === tab.id);

    if (currentIndex === -1) return;

    // Get IDs of all tabs to the right
    const tabsToClose = tabs
      .slice(currentIndex + 1)
      .map(t => t.id)
      .filter(id => id !== undefined);

    if (tabsToClose.length > 0) {
      await chrome.tabs.remove(tabsToClose);
    }
  } catch (error) {
    console.error("Error closing tabs:", error);
  }
});

//to do: check pinned tab for "Close Left"
