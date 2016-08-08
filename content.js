
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  switch (request.action) {
  case 'columns':
    columnize(request.column);
    break;
  case 'show-ads':
    showAds(request.display);
    break;
  case 'trim-spaces':
    trimSpaces();
  }
});

// poke pageAction.show
chrome.runtime.sendMessage({action: 'show-page-action'}, function(response){});
