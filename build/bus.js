chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.action === 'add_to_favorite') {
    fetch('https://www.lamoda.ru/apix/catalog/products/?skus=' + request.article)
      .then(response => response.json())
      .then(json => sendResponse(json))
      .catch(function(error) {
        sendResponse('Request failed', error);
      });
    return true;
  }
});
