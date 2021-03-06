(function(){
  'use script';

  var sendMessage = function(params, callback){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, params, callback);
    });
  };

  var _forEach = function(xs, f) {
    if (xs.forEach)
      xs.forEach(f)
    else
      [].forEach.call(xs, f)
  }

  var adsCheckBox = document.querySelector('#trim-ads');
  if (adsCheckBox) {
    adsCheckBox.addEventListener('change', function(){
      sendMessage({
        action: 'trim-ads',
      }, function(response){});
    });
  }

  var trimCheckBox = document.querySelector("#trim-spaces");
  if (trimCheckBox) {
    trimCheckBox.addEventListener('change', function(){
      sendMessage({action: 'trim-spaces'}, function(response){});
    });
  }

  // Column buttons
  _forEach(document.querySelectorAll("button"), function(button){
    button.addEventListener('click', function(){
      sendMessage({
        action: 'columns',
        column: button.textContent
      }, function(response){});
    });
  });
})();
