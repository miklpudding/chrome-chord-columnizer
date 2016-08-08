
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request.action == 'show-page-action') {
    chrome.pageAction.show(sender.tab.id);
  }
});
