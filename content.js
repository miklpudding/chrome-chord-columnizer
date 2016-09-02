
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  switch (request.action) {
  case 'columns':
    columnize(request.column);
    break;
  case 'trim-ads':
    trimAds();
    break;
  case 'trim-spaces':
    trimSpaces();
    break;
  }
});

// poke pageAction.show
chrome.runtime.sendMessage({action: 'show-page-action'}, function(response){});
