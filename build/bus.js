chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var url = "";

  if (request.action === 'add_to_favorite') {
    fetch('http://aggregator.com/api/addtofavorite?page=' + request.page)
      .then(response => response.json())
      .then(json => sendResponse(json))
      .catch(function(error) {
        sendResponse('Request failed', error);
      });
    return true;
  }
});
