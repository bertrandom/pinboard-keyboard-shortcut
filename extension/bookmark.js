closeEventBound = false;

chrome.commands.onCommand.addListener(function(command) {
    
    if (command === 'bookmark-on-pinboard') {

        chrome.tabs.getSelected(null, function (tab) {

            if (tab.url.substring(0,9) == 'chrome://') {
                return;
            }

            // use message passing to get the selected text (if any) to use as the description
            // see https://developer.chrome.com/extensions/messaging.html
            chrome.tabs.sendMessage(tab.id, {action: "getDescription"}, function(response) {
                description = response.description;

                // make creating the tab part of the sendMessage callback
                // so that the tab isn't created before the response with the description
                // is received
                chrome.tabs.create({
                                url: 'https://pinboard.in/add?url=' + encodeURIComponent(tab.url) + '&title=' + encodeURIComponent(tab.title) +
                                '&description=' + encodeURIComponent(description),
                                index: tab.index,
                            });

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
