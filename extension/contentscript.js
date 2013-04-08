// content script to allow access to the selected text so it can be used
// for the bookmark description
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
            if (request.action == "getDescription") {
                sendResponse({ description: document.getSelection().toString() });
            } else {
                sendResponse({ description: "" });
            }
    }
);