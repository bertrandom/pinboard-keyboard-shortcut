closeEventBound = false;

chrome.commands.onCommand.addListener(function(command) {
    
    if (command === 'bookmark-on-pinboard') {

        chrome.tabs.getSelected(null, function (tab) {

            if (tab.url.substring(0,9) == 'chrome://') {
                return;
            }

            chrome.tabs.create({
                url: 'https://pinboard.in/add?url=' + encodeURI(tab.url) + '&title=' + encodeURI(tab.title),
                index: tab.index,
            });

        });

        if (!closeEventBound) {

            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                if (tab.status == 'complete' && tab.url == 'https://pinboard.in/add') {
                    chrome.tabs.remove(tab.id);
                }
            });

            closeEventBound = true;

        }


    }

});